import { PartialType } from "@nestjs/mapped-types";
import { CategoryImageDto } from "./category.image.dto";

export class CreateCategoryImageDto extends PartialType(CategoryImageDto) {}


