import { Navbar } from "./entities/navbar.entity";
import { NAVBARS_REPOSITORY } from '../../core/constants';

export const navbarsProviders = [
  {
    provide: NAVBARS_REPOSITORY,
    useValue: Navbar
  }
];
