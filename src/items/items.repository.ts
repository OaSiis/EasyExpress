import ItemModel, { IItem } from "./items.model";
import { CreateItemInput } from "./items.dto";

export const findAll = async (): Promise<IItem[]> => {
  return ItemModel.find();
};

export const findOneById = async(id: string): Promise<IItem | null> => {
  return ItemModel.findById(id);
};

export const create = async (props: CreateItemInput): Promise<IItem> => {
  const { text, isDone } = props;



  return ItemModel.create({ text, isDone });
};

export const deleteOne = async (id: string): Promise<IItem | null> => {
  return ItemModel.findByIdAndRemove(id);
};
