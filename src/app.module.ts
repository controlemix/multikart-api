import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard, KeycloakConnectModule,
  ResourceGuard,
  RoleGuard
} from 'nest-keycloak-connect';
// nestjs-keycloak


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
import { KeycloakGuard, KeycloakModule } from './keycloak';
import { ConfigModule } from './decorator/config/config.module';
import { KeycloakConfigService } from './decorator/config/keycloak-config.service';

// import { KeycloakModule } from './core/keycloak/keycloak.module';
// import { KeycloakService } from './core/keycloak/keycloak.service';



// @Module({
//   imports: [
//     KeycloakConnectModule.registerAsync({
//       useExisting: KeycloakConfigService,
//       imports: [ConfigModule]
//     }),
//     KeycloakModule,
//     DatabaseModule,
//     UsersModule,
//     AuthModule,
//     CategoryModule,
//     MenusModule,
//     MenusSelfChildrensModule,
//     MinioClientModule,
//     FileUploadModule,
//     MediasModule,
//   ],  
//   controllers: [AppController],
//   providers: [
//     AppService,
//     {
//       provide: APP_GUARD,
//       useClass: AuthGuard 
//     },
//     {
//       provide: APP_GUARD,
//       useClass: KeycloakGuard,
//     },
//     {
//       provide: APP_GUARD,
//       useClass: KeycloakGuard,
//     },
//   ],
//   // providers: [
//   //   AppService,

//   //   {
//   //     provide: APP_GUARD,
//   //     useClass: AuthGuard,
//   //   },
//   //   {
//   //     provide: APP_GUARD,
//   //     useClass: ResourceGuard,
//   //   },
//   //   {
//   //     provide: APP_GUARD,
//   //     useClass: RoleGuard,
//   //   },


//   // ],
// })


@Module({
  imports: [
    // KeycloakConnectModule.registerAsync({
    //   useExisting: KeycloakConfigService,
    //   imports: [ConfigModule]
    // }),
    // KeycloakModule,
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
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}


