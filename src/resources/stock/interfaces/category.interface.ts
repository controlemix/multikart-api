import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export interface ICategoryDtoAttributes {
  id?: number;
  title: string;
  description?: string;  
  shortDescription?: string;
  tags?: string;
  metaDescription?: string;
  imgDefaultUrl?: string;
  imgLargeLightUrl?: string;
  imgMediumLightUrl?: string;
  imgSmallLightUrl?: string;
  imgLargeDarkUrl?: string;
  imgMediumDarkUrl?: string;
  imgSmallDarkUrl?: string;
  pathPrimary?: string;  
  pathPrimaryIcon?: string;  
  pathPrimaryFriendly?: string;
  pathMultiShop?: string;  
  pathMultiShopIcon?: string;  
  pathMultiShopFriendly?: string;
  active?: boolean;  
  activeStartDate?: number;  
  activeEndDate?: number;
  activeMultiShopStartDate?: number;  
  activeMultiShopEndDate?: number;
  shopPrimaryId?: number;
  multiShopId?: number;
  isActive?: boolean;  
  order?: number;
  ranking?: number;
}