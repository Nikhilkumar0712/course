import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ICourse } from './course-interface';
import { ICategory } from 'src/categories/category-interface';
import { ISubCategory } from 'src/subCategories/subCategories.interface';
@Injectable()
export class CourseService {

  constructor(
    @InjectModel('Course')
    private readonly courseModel: Model<ICourse>,
    @InjectModel('Category')
    private readonly categoryModel: Model<ICategory>,
    @InjectModel('SubCategory')
    private readonly subCategoryModel: Model<ISubCategory>
  ) { }


  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      const newCourse = new this.courseModel(createCourseDto);
      await newCourse.save();
      return {
        message: 'Course created successfully',
        course: newCourse,
        success:true
      };
    } catch (error) {
      return {
        message: 'Error creating course',
        error: error.message,
        success:false
      };
    }
  }
  async getAllCourses() {
    try {
      
      const response = await this.courseModel.find().populate([
        {
          path: "category",
          model: "Category"
        },
        {
          path: "subCategory",
          model: "SubCategory"
        }
      ]);

      return {
        message: 'List fetched successfully',
        courses: response ,
        success:true
      };
    } catch (error) {
      return {
        message: 'Error fetching courses',
        error: error.message,
        success:false
      };
    }
  }


  async getCourseById(id: ObjectId) {
    try {
      let response = await this.courseModel.findById(id)

      return {
        message: 'fetched successfully',
        data: response,
        success:true
      }
    } catch (error) {
      return {
        message: 'fetched successfully',
        data: error.message,
        success:false
      }
    }
  }

  async updateCourse(id: ObjectId, updateCourseDto: UpdateCourseDto) {
    try {
      let response = await this.courseModel.findOneAndUpdate({ _id: id },
        { $set: { ...updateCourseDto } },
        { new: true, lean: true }
      )
      return {
        message: 'updated successfully',
        data: response,
        success:true
      }
    } catch (error) {
      return {
        message: 'fetched successfully',
        data: error.message,
        success:false
      }
    }
  }


}
