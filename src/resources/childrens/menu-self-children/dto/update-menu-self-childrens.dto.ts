import { PartialType } from "@nestjs/mapped-types";
import { MenuSelfChildrenDto } from "./menu-self-childrens.dto";

export class UpdateMenuSelfChildrenDto extends PartialType(MenuSelfChildrenDto) {}