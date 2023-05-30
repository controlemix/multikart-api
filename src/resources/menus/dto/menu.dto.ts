import { IMenuDtoAttributes } from '../interfaces/menu.interface';
import { MenuChildrenDto } from './menu-children.dto';

export class MenuDto implements IMenuDtoAttributes {
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