import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { MenusModule } from './resources/menus/menus.module';
import { MenusSelfChildrensModule } from './resources/childrens/menu-self-children/menu-self-childrens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    MenusModule,
    MenusSelfChildrensModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



