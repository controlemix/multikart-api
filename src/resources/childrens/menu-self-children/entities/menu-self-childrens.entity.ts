import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { IMenuSelfChildrenDtoAttributes } from "../interfaces/menu-self-childrens.interface";
import { MenuSelfChildrenDto } from "../dto/menu-self-childrens.dto";
import { MenuChildren } from "src/resources/menus/entities/menu-children.entity";

@Table({ tableName: "menu_self_childrens", timestamps: true })
export class MenuSelfChildren extends Model<MenuSelfChildrenDto, MenuSelfChildrenDto> implements IMenuSelfChildrenDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    // @ForeignKey(() => MenuChildren) 
    // @Column childrenId: number;
    // @BelongsToMany(() => MenuChildren,{ as: 'childrens', through: 'menu_childrens_ident', foreignKey: 'childrenId', otherKey: 'childrenParentId'})
    // childrens: MenuChildren[];

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for menu' })
    title: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'link', description: 'Type menu' })
    type: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: false, description: 'Set megamenu' })
    megaMenu: boolean;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: "", description: 'Set megamenu img' })
    megaMenuImg: string;

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

    // @Column childrenParentId: number;
    // @BelongsToMany(() => MenuChildren,{ as: 'children', through: 'menu_childrens_ident', foreignKey: 'childrenParentId', otherKey: 'childrenParentId'})
    // children: MenuChildren[];

    // @Column childrenParentId: number;
    // @BelongsToMany(() => MenuSelfChildren,{ as: 'children', through: 'menu_childrens_ident', foreignKey: 'childrenParentId', otherKey: 'childrenParentId'})
    // children: MenuSelfChildren[];

    @ApiProperty({ example: 1, description: 'Set ForeignKey for MenuChildren' })
    @ForeignKey(() => MenuChildren) 
    @Column childrenParentId!: number;
    @BelongsTo(() => MenuChildren) menuChildren: MenuChildren;

    // @HasMany(() => MenuChildren) children: MenuChildren[];
}