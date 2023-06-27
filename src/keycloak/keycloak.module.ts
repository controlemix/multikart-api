import { Module } from '@nestjs/common';
import { DecoratorModule, KeycloakService } from '../decorator'
import { keycloakProviders } from './keycloak.providers';

import { ConfigModule } from '@nestjs/config'


@Module({
  providers: [KeycloakService, ...keycloakProviders],
  imports: [ConfigModule.forRoot({ isGlobal: true }), DecoratorModule],
  exports: [KeycloakService, ...keycloakProviders],
})


export class KeycloakModule {}




