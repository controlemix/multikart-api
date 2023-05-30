import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { menusProviders } from './menus.providers';
import { menusChildrenProviders } from './menus-children.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController],
  providers: [MenusService, ...menusProviders, ...menusChildrenProviders]
})
export class MenusModule {}
