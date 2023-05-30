import { MENUS_CHILDREN_REPOSITORY } from '../../core/constants';
import { MenuChildren } from './entities/menu.entity';

export const menusChildrenProviders = [
  {
    provide: MENUS_CHILDREN_REPOSITORY,
    useValue: MenuChildren
  }
];
