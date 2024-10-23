import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { subCategorySchema } from './sub-category.schema';



@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  imports: [
    MongooseModule.forFeature([
      { name: "SubCategory", schema: subCategorySchema }
    ])
  ],
  exports: [SubCategoryService]
})
export class SubCategoryModule { }
