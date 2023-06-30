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
    categoriesId: number;

    @ForeignKey(() => Medias)
    @Column({ allowNull: false, type: DataType.INTEGER })
    mediasId: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    order: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    ranking: number;

    @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
    isActive: boolean;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    isRotate: boolean;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    isDefault: boolean;

    @Column({ allowNull: true, type: DataType.DATE })
    activateStartAt: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    activateEndAt: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    createdAt: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updatedAt: Date;




    // @BelongsTo(() => Category, 'id' ) 
    // category: Category;


    // @HasMany(() => Medias, 'id' )
    // medias: Medias[];

    


    
    
}