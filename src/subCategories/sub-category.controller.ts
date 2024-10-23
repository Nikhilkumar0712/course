import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) { }

  @Post('/create')
  createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.createSubCategory(createSubCategoryDto);
  }

  @Get('/all')
  getAllSubCategories() {
    return this.subCategoryService.getAllSubCategories();
  }

  @Get(':id')
  getSubCategoryById(@Param('id') id: string) {
    return this.subCategoryService.getSubCategoryById(id);
  }

  @Patch(':id')
  updateSubCategory(@Param('id') id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
  }


}
