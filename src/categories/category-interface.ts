import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  subCategories: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
