import { Document, ObjectId } from "mongoose";

export interface ICourse extends Document {
  name: string;
  CategoryService: ObjectId;
  subCategories: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
