import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Model } from 'mongoose';
import { ISubCategory } from './subCategories.interface';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel('SubCategory')
    private readonly subCategoryModel: Model<ISubCategory>
  ) { }

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    try {
      const response = await new this.subCategoryModel(createSubCategoryDto).save();
      return {
        data: response,
        message: "Subcategory created successfully", 
      };
    } catch (error) {
      return {
        message: "Error creating subcategory", 
        error: error.message, 
      };
    }
  }
  

  async getAllSubCategories() {
    try {
      
      const subCategories = await this.subCategoryModel.find().populate('category')

      return {
        data: subCategories,
        message: "All subcategories retrieved successfully",
      };
    } catch (error) {
      throw new Error(`Error retrieving subcategories: ${error.message}`);
    }
  }
  

  async getSubCategoryById(id: string) {
    try {
    
      const subCategory = await this.subCategoryModel.findById(id).populate('category'); 
  
      if (!subCategory) {
        return {
          message: `Subcategory with ID ${id} not found`,
          success: false,
        };
      }
  
      return {
        data: subCategory,
        message: "Subcategory retrieved successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(`Error retrieving subcategory: ${error.message}`);
    }
  }
  

  async updateSubCategory(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    try {
    
      const existingSubCategory = await this.subCategoryModel.findById(id);
      
      if (!existingSubCategory) {
        return {
          message: `Subcategory with ID ${id} not found`,
          success: false,
        };
      }
  
      
      const updatedSubCategory = await this.subCategoryModel.findByIdAndUpdate(
        id,
        { $set: updateSubCategoryDto },
        { new: true, runValidators: true }
      );
  
      return {
        data: updatedSubCategory,
        message: "Subcategory updated successfully",
        success: true,
      };
    } catch (error) {
      throw new Error(`Error updating subcategory: ${error.message}`);
    }
  }
  
  

 
}
