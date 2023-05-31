import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { menusProviders } from './menus.providers';
import { menusChildrenProviders } from './menus-children.providers';
import { MenusChildrenController } from './menus-children.controller';
import { MenusChildrenService } from './menus-children.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController, MenusChildrenController],
  providers: [MenusService, MenusChildrenService, ...menusProviders, ...menusChildrenProviders]
})
export class MenusModule {}
