"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.create = exports.findOneById = exports.findAll = void 0;
const items_model_1 = __importDefault(require("./items.model"));
const findAll = async () => {
    return items_model_1.default.find();
};
exports.findAll = findAll;
const findOneById = async (id) => {
    return items_model_1.default.findById(id);
};
exports.findOneById = findOneById;
const create = async (props) => {
    const { text, isDone } = props;
    return items_model_1.default.create({ text, isDone });
};
exports.create = create;
const deleteOne = async (id) => {
    return items_model_1.default.findByIdAndRemove(id);
};
exports.deleteOne = deleteOne;
