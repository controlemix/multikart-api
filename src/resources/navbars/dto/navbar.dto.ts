import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export interface NavbarsDtoAttributes {
  id?: number;
  openMobileNav: boolean;
  subNav: boolean;
  activeItem: boolean;
  activeChildItem: boolean;
  activeMegaChild: boolean;
  leftSideBarVal: boolean;
  title: string;
  type: string;
  badgeValue: string;
  active: boolean;
}

export class NavbarDto implements NavbarsDtoAttributes {
  id: number;
  openMobileNav: boolean;
  subNav: boolean;
  activeItem: boolean;
  activeChildItem: boolean;
  activeMegaChild: boolean;  
  @IsNotEmpty()
  leftSideBarVal: boolean;
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsNotEmpty()
  @MinLength(3)
  type: string;  
  badgeValue: string;
  active: boolean;
}
