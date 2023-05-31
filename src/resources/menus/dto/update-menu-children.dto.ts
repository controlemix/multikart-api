import { PartialType } from "@nestjs/mapped-types";
import { MenuChildrenDto } from "./menu-children.dto";

export class UpdateMenuChildrenDto extends PartialType(MenuChildrenDto) {}


