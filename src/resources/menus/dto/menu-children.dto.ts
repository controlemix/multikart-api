import { MenuSelfChildrenDto } from 'src/resources/childrens/menu-self-children/dto/menu-self-childrens.dto';
import { IMenuChildrenDtoAttributes } from '../interfaces/menu-children.interface';

export class MenuChildrenDto implements IMenuChildrenDtoAttributes {
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
