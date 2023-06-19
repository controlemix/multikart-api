import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { ICategoryImageDtoAttributes } from '../interfaces/category.image.interface';

export class CategoryImageDto implements ICategoryImageDtoAttributes {
  id?: number;
  categoryId: number;
  mediaId: number;
}