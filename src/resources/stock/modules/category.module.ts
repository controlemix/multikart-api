import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { categoryProviders } from '../providers/category.providers';
import { AuthService } from 'src/resources/auth/auth.service';
import { authProviders } from 'src/resources/auth/auth.providers';

import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard, KeycloakConnectModule,
  ResourceGuard,
  RoleGuard
} from 'nest-keycloak-connect'
import { AuthModule } from 'src/resources/auth/auth.module';
import { KeycloakConfigService } from 'src/decorator/config/keycloak-config.service';
import { ConfigModule } from 'src/decorator/config/config.module';
import { KeycloakModule } from 'src/keycloak';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule]
    }),
    KeycloakModule,
    DatabaseModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    CategoryService, ...categoryProviders, AuthService, ...authProviders, JwtService 

  ],
  controllers: [CategoryController],
})
export class CategoryModule { }


// @Module({
//   imports: [DatabaseModule],
//   controllers: [CategoryController],
//   providers: [CategoryService, ...categoryProviders, AuthService, ...authProviders, JwtService ],
// })
// export class CategoryModule {}
