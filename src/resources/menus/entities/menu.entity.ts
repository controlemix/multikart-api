import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { IMenuDtoAttributes } from "../interfaces/menu.interface";
import { MenuDto } from "../dto/menu.dto";
import { MenuChildrenDto } from "../dto/menu-children.dto";
import { IMenuChildrenDtoAttributes } from "../interfaces/menu-children.interface";

@Table({ tableName: "menu", timestamps: true })
export class Menu extends Model<MenuDto, MenuDto> implements IMenuDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for menu' })
    title: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'link', description: 'Type menu' })
    type: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: false, description: 'Set megamenu' })
    megaMenu: boolean;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: '/shop/fashion', description: 'Route for menu' })
    path: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'new', description: 'badge for menu' })
    badgeValue: string;
  
    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: true, description: 'Set menu active' })
    active: boolean;
  
    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: true, description: 'Set menu in navbar' })
    navBar: boolean;
  
    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: true, description: 'Set menu in side menu' })
    sideBar: boolean;

    @HasMany(() => MenuChildren) children: MenuChildren[];
}

@Table({ tableName: "menu_children", timestamps: true })
export class MenuChildren extends Model<MenuChildrenDto, MenuChildrenDto> implements IMenuChildrenDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    @ApiProperty({ example: 1, description: 'Set ForeignKey for MenuChildren' })
    @ForeignKey(() => Menu) @Column parentId!: number;
    @BelongsTo(() => Menu) menu: Menu;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for menuChildren' })
    title: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'link', description: 'Type menuChildren' })
    type: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: '/shop/shoes', description: 'Route for menuChildren' })
    path: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: true, description: 'Set menuChildren active' })
    active: boolean;
}