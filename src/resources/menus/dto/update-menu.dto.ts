import { PartialType } from "@nestjs/mapped-types";
import { MenuDto } from "./menu.dto";

export class UpdateMenuDto extends PartialType(MenuDto) {}


