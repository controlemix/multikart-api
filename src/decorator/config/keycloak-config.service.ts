import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'http://localhost:8082/auth',
      realm: 'lojamix',
      clientId: 'lojamix-plataform',
    //   resource: 'lojamix-plataform',
      secret: 'awTSZLN48GzB0LQPdc17yTauCQhafz7U',
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose'],
      useNestLogger: false,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
  
}

// realm: 'lojamix',
// clientId: 'lojamix-plataform',
// secret: 'awTSZLN48GzB0LQPdc17yTauCQhafz7U',
// resource: 'lojamix-dashboard',
// policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
// tokenValidation: TokenValidation.ONLINE,
// 'auth-server-url': 'http://localhost:8082/auth',
// 'bearer-only': true,
// 'confidential-port': 0,
// 'ssl-required': 'external'