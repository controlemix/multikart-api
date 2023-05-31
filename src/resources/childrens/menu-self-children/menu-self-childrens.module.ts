import { DatabaseModule } from "src/core/database/database.module";
import { MenusSelfChildrensController } from "./menu-self-childrens.controller";
import { MenusSelfChildrensService } from "./menu-self-childrens.service";
import { menusSelfChildrensProviders } from "./menu-self-childrens.providers";
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [MenusSelfChildrensController],
  providers: [MenusSelfChildrensService, ...menusSelfChildrensProviders]
})

export class MenusSelfChildrensModule {}
