import mongoose, { Schema } from 'mongoose';

export const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required:true }
  },
  { timestamps: true },
);
