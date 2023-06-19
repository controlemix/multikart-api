import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export interface ICategoryImageDtoAttributes {
  id?: number;
  categoryId: number;
  mediaId: number;
}