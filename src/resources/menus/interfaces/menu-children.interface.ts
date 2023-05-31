import { MenuSelfChildrenDto } from "src/resources/childrens/menu-self-children/dto/menu-self-childrens.dto";

export interface IMenuChildrenDtoAttributes {
  id?: number;
  parentId?: number;
  childrenParentId?: number;  
  title?: string;
  type?: string;
  path?: string;
  active?: boolean;  
  order?: number;
  children?: MenuSelfChildrenDto[];
}