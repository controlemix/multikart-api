import { Module } from '@nestjs/common';
import { KeycloakGuard } from '../guard';
import { KeycloakService, TokenService } from '../service';
import { KeycloakStrategy } from '../strategy';


import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    
    KeycloakService, 
    KeycloakStrategy, 
    KeycloakGuard, 
    TokenService
],
})
export class DecoratorModule {}
