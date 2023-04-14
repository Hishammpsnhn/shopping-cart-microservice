import mongoose from "mongoose";
import { app } from "./app";
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
}
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
}
if (!process.env.PORT) {
    throw new Error("MONGO_URI must be defined");
}

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(3000, () => {
        console.log("Auth server listening on port 3000")
    })

})