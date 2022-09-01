import { Request, Response } from "express";
import * as ItemRepository from "./items.repository";
import { IItem, joiSchema } from "./items.model";

/**
 * Get all items
 *
 * @param request
 * @param response
 */
export const getItems = async (request: Request, response: Response) => {
  try {
    const items: IItem[] = await ItemRepository.findAll();
    response.json(items);
  } catch (err: unknown) {
    if (err instanceof Error) {
      response.status(400).json({ message: err.message });
    }
  }
};

/**
 * Get one specific item by id
 * @param request
 * @param response
 */
export const getItem = async (request: Request, response: Response) => {
  try {
    const item: IItem|null = await ItemRepository.findOneById(request.params.id);

    if (!item) {
      response.status(404).json({ message: "Item not found."});
    }

    response.json(item);
  } catch (err: unknown) {
    if (err instanceof Error) {
      response.status(400).json({ message: err.message });
    }
  }
};

/**
 * Create an item
 *
 * @param request
 * @param response
 */
export const createItem = async (request: Request, response: Response) => {
  try {
    // Validate the request body
    const requestData = await joiSchema.validateAsync(request.body);
    // Create it in the database
    const item: IItem = await ItemRepository.create(requestData);
    // Send 201 and the newly created data
    response.status(201).json(item);
  } catch (err: unknown) {
    if (err instanceof Error) {
      response.status(400).json({ message: err.message });
    }
  }
};

/**
 * Delete one specific item by id
 *
 * @param request
 * @param response
 */
export const deleteItem = async (request: Request, response: Response) => {
  try {
    const item: IItem|null = await ItemRepository.deleteOne(request.body);

    if (!item) {
      response.status(404).json({ message: "Item not found."});
    }

    response.status(204);
  } catch (err: unknown) {
    if (err instanceof Error) {
      response.status(400).json({ message: err.message });
    }
  }
};
