import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

import { MediasDto } from "../dto/medias.dto";
import { IMediasDtoAttributes } from "../interfaces/medias.interface";

@Table({ tableName: "medias", timestamps: true })
export class Medias extends Model<MediasDto, MediasDto> implements IMediasDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for Media' })
    title: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Original Name for Media' })
    originalName: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Hash Name for Media' })
    hashName: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Encoding for Media' })
    encoding: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Mimetype for Media' })
    mimetype: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Item Store for Media' })
    itemStore: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'Shoes', description: 'Item Id for Media' })
    itemId: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'Shoes', description: 'Client Id for Media' })
    clientId: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'Shoes', description: 'Shop Id for Media' })
    shopId: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Role for Media' })
    role: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'Shoes', description: 'Size for Media' })
    size: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Url for Media' })
    url: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Token for Media' })
    token: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Image Type for Media' })
    imageType: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Image Width for Media' })
    imageWidth: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Image Height for Media' })
    imageHeight: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Image Title for Media' })
    imageTitle: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Image Alt for Media' })
    imageAlt: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: 'Shoes', description: 'Is Active for Media' })
    isActive: boolean;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Domain for Media' })
    domain: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Port for Media' })
    port: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Bucket for Media' })
    bucket: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'Shoes', description: 'Order for Media' })
    order: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'Shoes', description: 'Ranking for Media' })
    ranking: number;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Description for Media' })
    description?: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Tags for Media' })
    tags?: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Meta Title for Media' })
    metaTitle?: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Meta Description for Media' })
    metaDescription?: string;

    


    



    

    
}