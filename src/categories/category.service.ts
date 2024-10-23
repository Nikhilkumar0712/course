import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model, ObjectId, Types } from 'mongoose';
import { ICategory } from './category-interface';
import { ISubCategory } from 'src/subCategories/subCategories.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<ICategory>,
    @InjectModel('SubCategory')
    private readonly subCategoryModel: Model<ISubCategory>
  ) { }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = new this.categoryModel(createCategoryDto);
      const response = await category.save();

      return {
        data: response,
        message: "Category created successfully",
        success: true
      };
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }


  async getAllCategories() {
    try {

      const populatedCategories = await this.categoryModel.find()

      return {
        data: populatedCategories,
        message: "Categories retrieved successfully",
      };
    } catch (error) {
      throw new Error(`Error retrieving categories: ${error.message}`);
    }
  }




  async getCategoryById(id: string) {
    try {
      const objectId = new Types.ObjectId(id);
      const category = await this.categoryModel.findOne({ _id: objectId })

      if (!category) {
        return {
          message: 'Category not found',
          success: false
        };
      }

      return {
        data: {
          _id: category._id,
          categoryName: category.categoryName,
        },
        message: "Category fetched successfully",
        success: true
      };
    } catch (error) {
      console.error('Error in getCategoryById:', error.message);
      return {
        message: 'Failed to fetch category',
        error: error.message,
      };
    }
  }



  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {

      const existingCategory = await this.categoryModel.findById(id);

      if (!existingCategory) {
        return { message: `Category with ID ${id} not found`, success: false };
      }

      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        { $set: updateCategoryDto },
        { new: true, runValidators: true }
      );

      return {
        data: updatedCategory,
        message: "Category updated successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async getCategoryWithSubcategoryCount() {
    try {
      const categories = await this.categoryModel.find();

      const result = await Promise.all(categories.map(async (category) => {
        const subCategories = await this.subCategoryModel.find({ category: category._id });

        return {
          categoryName: category.categoryName,
          subCategoryCount: subCategories.length,
        };
      }));

      return {
        data: result,
        message: "Fetched successfully"
      };
    } catch (error) {
      console.error("Error fetching categories with subcategory counts:", error);
      return {
        message: "An error occurred while fetching categories.",
        error: error.message || "Unknown error",
      };
    }
  }




}
