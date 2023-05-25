import { PartialType } from "@nestjs/mapped-types";
import { CreateNavbarDto } from "./create-navbar.dto";

export class UpdateNavbarDto extends PartialType(CreateNavbarDto) {
  active?: number;
  openMobileNav?: number;
  subNav?: number;
  activeItem?: string;
  activeChildItem?: string;
  activeMegaChild?: string;
  leftSideBarVal?: number;
  title?: string;
  type?: string;
  badgeValue?: string;
}
