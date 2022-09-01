import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { itemsRouter } from "./items/items.router";

dotenv.config();

export const {
  DATABASE_URL,
  SERVER_PORT,
} = process.env;

const app: Express = express();

/*******************
 * Configuration
 * *******************/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/*******************
 * DataBase
 * *******************/
void mongoose.connect(DATABASE_URL || "");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

/*******************
 * Routes
 * *******************/
app.use("/api/items", itemsRouter);
app.use((req, res) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message
  });
});

export default app;
