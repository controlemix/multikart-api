import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export interface IMediasDtoAttributes {
  id?: number;
  title: string;
  originalName: string;
  hashName: string;  
  encoding: string;
  mimetype: string;
  itemStore: string;
  itemId: number;
  clientId: number;
  shopId: number;
  role: string;
  size: number;
  url: string;  
  token: string;  
  imageType: string;  
  imageWidth: string;  
  imageHeight: string;  
  imageTitle: string;
  imageAlt: string;  
  isActive: boolean;  
  domain: string;  
  port: string;  
  bucket: string;  
  order: number;
  ranking: number;
  description?: string;  
  tags?: string;  
}