import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import bodyParser from "body-parser";

//import routes
import { router as authRoute } from "./modules/auth/auth.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/auth", authRoute);

const connectMongoDB = async () =>
  await connect("mongodb://127.0.0.1:27017/notesAppDb");

connectMongoDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server :)");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
