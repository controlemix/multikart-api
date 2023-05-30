import { IMenuChildrenDtoAttributes } from '../interfaces/menu-children.interface';

export class MenuChildrenDto implements IMenuChildrenDtoAttributes {
  id?: number;
  parentId?: number;
  title?: string;
  type?: string;
  path?: string;
  active?: boolean;
  order?: number;
  children?: MenuChildrenDto[];
}
