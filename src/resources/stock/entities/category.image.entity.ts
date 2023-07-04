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
    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    categoriesId: number;

    @ForeignKey(() => Medias)
    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    mediasId: number;

    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
    order: number;

    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
    ranking: number;

    @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
    isActive: boolean;

    @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: false })
    isRotate: boolean;

    @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
    isDefault: boolean;

    @Column({ allowNull: true, type: DataType.DATE, defaultValue: 0 })
    activateStartAt: Date;

    @Column({ allowNull: true, type: DataType.DATE, defaultValue: 0 })
    activateEndAt: Date;

    @Column({ allowNull: true, type: DataType.DATE, defaultValue: 0 })
    createdAt: Date;

    @Column({ allowNull: true, type: DataType.DATE, defaultValue: 0 })
    updatedAt: Date;




    // @BelongsTo(() => Category, 'id' ) 
    // category: Category;


    // @HasMany(() => Medias, 'id' )
    // medias: Medias[];

    


    
    
}