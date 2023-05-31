import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export interface IMenuSelfChildrenDtoAttributes {
  id?: number;
  childrenParentId?: number;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  path?: string;
  badgeValue?: string;
  active?: boolean;
  navBar?: boolean;
  sideBar?: boolean;
  order?: number;  
}