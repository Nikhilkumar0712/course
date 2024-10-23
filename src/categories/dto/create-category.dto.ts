import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string
}
