import { IsNotEmpty, MinLength, IsEmail, IsEnum } from "class-validator";

export interface CategoryDtoAttributes {
  id?: number;
  sku: string;
  category: string;
  images: string;
  shortDescription: string;
  description: string;
  details: string;
  salePrice: number;
  price: number;
  sale: boolean;
  colors: string;
  size: string;
  brand: string;
  tags: string;
  stock: number;
  status: boolean;
  name: string;
  quantity: number;
  isActive: boolean;
}

export class CategoryDto implements CategoryDtoAttributes {
  id: number;
  sku: string;

  // @IsNotEmpty()
  // @MinLength(3)
  category: string;

  images: string;

  // @IsNotEmpty()
  // @MinLength(72)
  shortDescription: string;

  // @IsNotEmpty()
  // @MinLength(120)
  description: string;

  // @IsNotEmpty()
  // @MinLength(120)
  details: string;

  salePrice: number;
  price: number;
  sale: boolean;

  
  colors: string;
  size: string;
  brand: string;
  tags: string;
  stock: number;
  status: boolean;

  // @IsNotEmpty()
  // @MinLength(3)
  name: string;

  quantity: number;
  isActive: boolean;
}
