import express, { Request, Response } from "express";
import { json } from "body-parser";
import amqp from 'amqplib'
import orderModel from "./model/orderModel";

var channel: any, connection;
const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());

function createOrder(products: any, userEmail: any) {
  let total = 0;
  for (let t = 0; t < products.length; ++t) {
    total += products[t].price;
  }
  const newOrder = new orderModel({
    products,
    user: userEmail,
    total_price: total,
  });
  newOrder.save();
  return newOrder;
}

async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER");
}

connect().then(() => {
  channel.consume("ORDER", (data: any) => {
    console.log("Consuming ORDER service");
    const { products, userEmail } = JSON.parse(data.content);
    console.log(products, userEmail)
    const newOrder = createOrder(products, userEmail);
    channel.ack(data);
    channel.sendToQueue(
      "PRODUCT",
      Buffer.from(JSON.stringify({ newOrder }))
    );
  });
});

export { app };