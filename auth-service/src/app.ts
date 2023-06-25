import express, { Request, Response } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { SignUpRouter } from "./routes/signup";
import { SignInRouter } from "./routes/signIn";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { signOutRouter } from "./routes/signOut";
import { currentUserRoute } from "./routes/currentUser";

const app = express();

const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(SignUpRouter);
app.use(SignInRouter);
app.use(signOutRouter)
app.use(currentUserRoute);

// app.all("*", async (req, res) => {
//   console.log(777777777777777);
  
//   throw new NotFoundError();
// });

app.use(errorHandler);

export { app };