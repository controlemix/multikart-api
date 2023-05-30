import { PartialType } from "@nestjs/mapped-types";
import { MenuChildrenDto } from "./menu-children.dto";

export class CreateMenuChildrenDto extends PartialType(MenuChildrenDto) {}