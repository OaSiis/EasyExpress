"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const ItemRepository = __importStar(require("./items.repository"));
const items_model_1 = require("./items.model");
/**
 * Get all items
 *
 * @param request
 * @param response
 */
const getItems = async (request, response) => {
    try {
        const items = await ItemRepository.findAll();
        response.json(items);
    }
    catch (err) {
        if (err instanceof Error) {
            response.status(400).json({ message: err.message });
        }
    }
};
exports.getItems = getItems;
/**
 * Get one specific item by id
 * @param request
 * @param response
 */
const getItem = async (request, response) => {
    try {
        const item = await ItemRepository.findOneById(request.params.id);
        if (!item) {
            response.status(404).json({ message: "Item not found." });
        }
        response.json(item);
    }
    catch (err) {
        if (err instanceof Error) {
            response.status(400).json({ message: err.message });
        }
    }
};
exports.getItem = getItem;
/**
 * Create an item
 *
 * @param request
 * @param response
 */
const createItem = async (request, response) => {
    try {
        // Validate the request body
        const requestData = await items_model_1.joiSchema.validateAsync(request.body);
        // Create it in the database
        const item = await ItemRepository.create(requestData);
        // Send 201 and the newly created data
        response.status(201).json(item);
    }
    catch (err) {
        if (err instanceof Error) {
            response.status(400).json({ message: err.message });
        }
    }
};
exports.createItem = createItem;
/**
 * Delete one specific item by id
 *
 * @param request
 * @param response
 */
const deleteItem = async (request, response) => {
    try {
        const item = await ItemRepository.deleteOne(request.body);
        if (!item) {
            response.status(404).json({ message: "Item not found." });
        }
        response.status(204);
    }
    catch (err) {
        if (err instanceof Error) {
            response.status(400).json({ message: err.message });
        }
    }
};
exports.deleteItem = deleteItem;
