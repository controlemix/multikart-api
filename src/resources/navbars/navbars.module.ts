import { Module } from "@nestjs/common";
import { NavbarsService } from "./navbars.service";
import { NavbarsController } from "./navbars.controller";
import { navbarsProviders } from "./navbars.providers";
import { DatabaseModule } from "../../core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [NavbarsController],
  providers: [NavbarsService, ...navbarsProviders]
})
export class NavbarsModule { }
