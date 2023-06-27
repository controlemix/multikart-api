import { KeycloakService } from '.';

export const keycloakProviders = [
  {
    provide: KeycloakService,
    useValue: KeycloakService,
  },
];
