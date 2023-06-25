import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { CategoryModule } from './resources/stock/modules/category.module';
import { MenusModule } from './resources/menus/menus.module';
import { MenusSelfChildrensModule } from './resources/childrens/menu-self-children/menu-self-childrens.module';
import { MinioClientModule } from './core/minio/modules/minio-client.module';
import { FileUploadModule } from './resources/file-upload/file-upload.module';
import { MediasModule } from './resources/medias/modules/medias.module';
import { KeycloakModule } from './core/keycloak/keycloak.module';
import { KeycloakService } from './core/keycloak/keycloak.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakService,
      imports: [KeycloakModule],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    MenusModule,
    MenusSelfChildrensModule,
    MinioClientModule,
    FileUploadModule,
    MediasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

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


  ],
})
export class AppModule {}
