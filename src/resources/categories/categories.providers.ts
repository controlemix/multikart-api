import { CATEGORIES_REPOSITORY } from '../../core/constants';
import { Category } from './entities/category.entity';

export const categoriesProviders = [
  {
    provide: CATEGORIES_REPOSITORY,
    useValue: Category
  }
];
