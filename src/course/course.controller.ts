import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ObjectId } from 'mongoose';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('/create')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get('/all')
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: ObjectId) {
    return this.courseService.getCourseById(id);
  }

  @Put('/update/:id')
  updateCourse(@Param('id') id: ObjectId, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

 
}
