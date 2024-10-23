import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from './course.schema';
import { CategorySchema } from 'src/categories/category-schema';
import { subCategorySchema } from 'src/subCategories/sub-category.schema';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    MongooseModule.forFeature([
      { name: "Course", schema: courseSchema },
      { name: "Category", schema: CategorySchema },
      { name: "SubCategory", schema: subCategorySchema }
    ])
  ],
  exports: [CourseService]
})
export class CourseModule { }
