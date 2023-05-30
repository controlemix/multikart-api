import { Model, Table, Column, DataType,  ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { MenuChildrenDto } from "../dto/menu-children.dto";
import { IMenuChildrenDtoAttributes } from "../interfaces/menu-children.interface";
import { Menu } from "./menu.entity";


@Table({ tableName: "menu_childrens", timestamps: true })
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

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: true, description: 'Set menuChildren active' })
    active: boolean;

    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
    @ApiProperty({ example: 1, description: 'order for children' })
    order: number;

}