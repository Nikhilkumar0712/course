import mongoose, { Schema } from "mongoose";

export const courseSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory" }
}, { timestamps: true })