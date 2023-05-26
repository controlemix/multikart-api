import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey
} from "sequelize-typescript";

import { ApiProperty } from '@nestjs/swagger';

export interface NavbarsDtoAttributes {
  id: number;
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

@Table({ tableName: "navbars", timestamps: true })
export class Navbar
  extends Model<NavbarsDtoAttributes, NavbarsDtoAttributes>
  implements NavbarsDtoAttributes {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  id!: number;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set is show in shop' })
  active?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set is show NavBar for mobile in shop' })
  openMobileNav?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set subItem in NavBar' })
  subNav?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set is show subItem in NavBar' })
  activeItem?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set is show child for subItem in NavBar' })
  activeChildItem?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set is show mega item child for subItem in NavBar' })
  activeMegaChild?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: false })
  @ApiProperty({ example: false, description: 'Set show left bar' })
  leftSideBarVal?: boolean;

  @Column({ allowNull: false, type: DataType.STRING })
  @ApiProperty({ example: "Home", description: 'Name for item' })
  title?: string;

  @Column({ allowNull: false, type: DataType.STRING })
  @ApiProperty({ example: "sub", description: 'Type item' })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING, defaultValue: '' })
  @ApiProperty({ example: "new", description: 'Name for item badge' })
  badgeValue?: string;
}
