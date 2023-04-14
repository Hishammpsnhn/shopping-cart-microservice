import { json } from "body-parser";
import express, { Request, Response } from "express";
import cookieSession from 'cookie-session'
import {
    NotAuthorizedError,
    NotFoundError,
    errorHandler,
} from "@hpshops/common/build";

const app = express();
const router = express.Router();


app.set("trust proxt", true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
    })
)

app.use('/',(req,res)=>{
    res.send("hi man how are you")
})

app.all("*", async (req, res) => {
    console.log(77777777);
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };