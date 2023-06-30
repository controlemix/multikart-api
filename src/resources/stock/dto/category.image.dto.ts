import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { ICategoryImageDtoAttributes } from '../interfaces/category.image.interface';

export class CategoryImageDto implements ICategoryImageDtoAttributes {
  id?: number;
  categoriesId: number;
  mediasId: number;
  order?: number;
  ranking?: number;
  isActive: boolean;
  isRotate?: boolean;
  isDefault?: boolean;
  activateStartAt?: Date;
  activateEndAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}