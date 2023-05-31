import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { IMenuDtoAttributes } from "../interfaces/menu.interface";
import { MenuDto } from "../dto/menu.dto";

import { MenuChildren } from "./menu-children.entity";

@Table({ tableName: "menus", timestamps: true })
export class Menu extends Model<MenuDto, MenuDto> implements IMenuDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for menu' })
    title: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'link', description: 'Type menu' })
    type: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: false, description: 'Set megamenu' })
    megaMenu: boolean;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: '/shop/fashion', description: 'Route for menu' })
    path: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'new', description: 'badge for menu' })
    badgeValue: string;
  
    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: true, description: 'Set menu active' })
    active: boolean;
  
    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: true, description: 'Set menu in navbar' })
    navBar: boolean;
  
    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: true, description: 'Set menu in side menu' })
    sideBar: boolean;

    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
    @ApiProperty({ example: 1, description: 'order for menu' })
    order: number;

    @HasMany(() => MenuChildren) 
    children: MenuChildren[];
}