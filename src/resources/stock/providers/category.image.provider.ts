import { CATEGORY_IMAGE_REPOSITORY } from '../../../core/constants';
import { CategoryImage } from '../entities/category.image.entity';

export const categoryImageProviders = [
  {
    provide: CATEGORY_IMAGE_REPOSITORY,
    useValue: CategoryImage,
  },
];
