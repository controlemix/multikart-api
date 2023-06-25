import { Injectable } from '@nestjs/common';
import { KeycloakConnectConfig, KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation,  } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
        realm: 'apps',
        resource: 'lojamix-dashboard',
        secret: 'pdgOQXcXBOgcWeVL4BMDnOhr0DSZagbw',
        'auth-server-url': 'http://localhost:8080/auth',
        'bearer-only': true,
        'confidential-port': 0,
        'ssl-required': 'external'
    };
  }

  
}
//   createKeycloakConnectOptions(): KeycloakConnectOptions {
//     return {
//       authServerUrl: 'http://192.168.1.7:8080',
//       realm: 'apps',
//       clientId: 'lojamix-dashboard',
//       secret: 'pdgOQXcXBOgcWeVL4BMDnOhr0DSZagbw',
//       cookieKey: 'KEYCLOAK_JWT',
//       logLevels: ['verbose'],
//       useNestLogger: false,
//       policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
//       tokenValidation: TokenValidation.ONLINE,
//     };
//   }
  
// }
