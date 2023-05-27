import { PartialType } from "@nestjs/mapped-types";
import { NavbarDto } from "./navbar.dto";
export class UpdateNavbarDto extends PartialType(NavbarDto) {}
