import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category-schema';
import { subCategorySchema } from 'src/subCategories/sub-category.schema';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    MongooseModule.forFeature([
      { name: "Category", schema: CategorySchema },
      { name: "SubCategory", schema: subCategorySchema }
    ])
  ],
  exports: [CategoryService]
})
export class CategoryModule { }
