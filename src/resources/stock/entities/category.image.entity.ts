import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

import { CategoryImageDto } from "../dto/category.image.dto";
import { ICategoryImageDtoAttributes } from "../interfaces/category.image.interface";
import { Medias } from "../../../resources/medias/entities/medias.entity";
import { Category } from "./category.entity";


@Table({ tableName: "category_image", timestamps: true })
export class CategoryImage extends Model<CategoryImageDto, CategoryImageDto> implements ICategoryImageDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    @ForeignKey(() => Category)
    @Column({ allowNull: false, type: DataType.INTEGER })
    categoryId: number;

    @ForeignKey(() => Medias)
    @Column({ allowNull: false, type: DataType.INTEGER })
    mediaId: number;

    @BelongsTo(() => Category)
    category: Category;

    @BelongsTo(() => Medias)
    media: Medias[];





    
    
}