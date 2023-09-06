import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import bodyParser from "body-parser";

//import routes
import { authRoute } from "./modules/auth/auth.router";
import { notesRoute } from "./modules/notes/notes.router";

//Load .env file to process.env
dotenv.config();

//Create an Express application
const app: Express = express();
const port =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

//Apply Middlewares
app.use(bodyParser.json());

//Apply Routes
app.use("/auth", authRoute);
app.use("/notes", notesRoute);

//Connect to DB
const connectMongoDB = async () =>
  await connect("mongodb://127.0.0.1:27017/notesAppDb");

connectMongoDB();

//Home Route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server :)");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
