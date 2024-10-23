import { Document, ObjectId } from "mongoose";

export interface ISubCategory extends Document {
  subCategoryName: string;
  category: ObjectId; // Refers to the Category schema
  createdAt?: Date;
  updatedAt?: Date;
}
