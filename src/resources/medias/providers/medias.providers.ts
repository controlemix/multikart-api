import { MEDIAS_REPOSITORY } from '../../../core/constants';
import { Medias } from '../entities/medias.entity';

export const mediasProviders = [
  {
    provide: MEDIAS_REPOSITORY,
    useValue: Medias,
  },
];
