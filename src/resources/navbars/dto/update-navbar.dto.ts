import { PartialType } from "@nestjs/mapped-types";
import { CreateNavbarDto } from "./create-navbar.dto";

export class UpdateNavbarDto extends PartialType(CreateNavbarDto) {
  active?: boolean;
  openMobileNav?: boolean;
  subNav?: boolean;
  activeItem?: boolean;
  activeChildItem?: boolean;
  activeMegaChild?: boolean;
  leftSideBarVal?: boolean;
  title?: string;
  type?: string;
  badgeValue?: string;
}
