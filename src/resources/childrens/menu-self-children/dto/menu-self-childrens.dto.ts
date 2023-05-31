import { IMenuSelfChildrenDtoAttributes } from "../interfaces/menu-self-childrens.interface";

export class MenuSelfChildrenDto implements IMenuSelfChildrenDtoAttributes {
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