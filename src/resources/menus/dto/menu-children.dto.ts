import { IMenuChildrenDtoAttributes } from '../interfaces/menu-children.interface';

export class MenuChildrenDto implements IMenuChildrenDtoAttributes {
  id?: number;
  idParent?: number;
  title: string;
  type: string;
  path: string;
  active: boolean;
  children?: MenuChildrenDto[];
}
