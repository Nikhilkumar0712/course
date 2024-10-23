import { IsNotEmpty, IsString, isNotEmpty, IsMongoId } from "class-validator";

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  subCategoryName: string

  @IsMongoId()
  @IsNotEmpty()
  category: string
}
