import { MENUS_SELF_CHILDREN_REPOSITORY } from 'src/core/constants';
import { MenuSelfChildren } from './entities/menu-self-childrens.entity';

export const menusSelfChildrensProviders = [
  {
    provide: MENUS_SELF_CHILDREN_REPOSITORY,
    useValue: MenuSelfChildren,
  },
];
