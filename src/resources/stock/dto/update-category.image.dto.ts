import { PartialType } from "@nestjs/mapped-types";
import { CategoryImageDto } from "./category.image.dto";

export class UpdateCategoryImageDto extends PartialType(CategoryImageDto) {}


