import { AuthService } from './auth.service';

export const authProviders = [
  {
    provide: AuthService,
    useValue: AuthService,
  },
];
