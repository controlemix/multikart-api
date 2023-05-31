import { MENUS_REPOSITORY } from '../../core/constants';
import { Menu } from './entities/menu.entity';

export const menusProviders = [
  {
    provide: MENUS_REPOSITORY,
    useValue: Menu,
  },
];
