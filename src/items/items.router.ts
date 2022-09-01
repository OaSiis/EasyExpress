import express from "express";
import * as ItemController from "./items.controller";

export const itemsRouter = express.Router();

itemsRouter.get("/", ItemController.getItems);
itemsRouter.get("/:id", ItemController.getItem);
itemsRouter.post("/", ItemController.createItem);
itemsRouter.delete("/:id", ItemController.deleteItem);
