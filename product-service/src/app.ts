import express, { Request, Response } from "express";
import { json } from "body-parser";
import Product from "./model/productModel";
import isAuthenticated from '../../src/isAuthenticated'
import amqp from 'amqplib'

var channel: any, connection;
const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());
var order:any;


async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PRODUCT");
}
connect();


app.post("/api/product/buy", isAuthenticated, async (req, res) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });
  channel.sendToQueue(
    "ORDER",
    Buffer.from(
      JSON.stringify({
        products,
        userEmail: req.user.email,
      })
    )
  );
  channel.consume("PRODUCT", (data: any) => {
    console.log("consuming product data")
    order = JSON.parse(data.content);
    channel.ack(data)
    return res.json(order);
  });
});

app.post("/api/product/create", isAuthenticated, async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
  });
  newProduct.save();
  return res.json(newProduct);
});

export { app };