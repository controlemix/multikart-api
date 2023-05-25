import { Navbar } from "./entities/navbar.entity";

export const navbarsProviders = [
  {
    provide: "NAVBARS_REPOSITORY",
    useValue: Navbar
  }
];
