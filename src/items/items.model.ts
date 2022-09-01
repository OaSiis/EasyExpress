import mongoose, { Document, Schema } from "mongoose";
import Joi from "joi";

export interface IItem extends Document {
  text: string
  isDone: boolean
}

export const joiSchema = Joi.object({
  text: Joi.string().required(),
  isDone: Joi.boolean()
});

const databaseSchema = new Schema({
  text: {
    required: true,
    type: String
  },
  isDone: {
    required: false,
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IItem>("Item", databaseSchema);
