import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { MenuChildrenDto } from '../dto/menu-children.dto';

export interface IMenuDtoAttributes {
  id?: number;
  title: string;
  type: string;
  megaMenu?: boolean;
  path: string;
  badgeValue?: string;
  active: boolean;
  navBar: boolean;
  sideBar: boolean;
  children?: MenuChildrenDto[];
}