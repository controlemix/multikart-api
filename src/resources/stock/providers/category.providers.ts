import { CATEGORY_REPOSITORY } from '../../../core/constants';
import { Category } from '../entities/category.entity';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
];
