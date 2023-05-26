import { PartialType } from "@nestjs/mapped-types";
import { Navbar } from "./../entities/navbar.entity";

export class CreateNavbarDto extends PartialType(Navbar) {}
