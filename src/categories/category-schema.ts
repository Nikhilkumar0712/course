import mongoose , { Schema } from "mongoose";

export const CategorySchema = new mongoose.Schema({
  categoryName: { type: String },

}, { timestamps: true })