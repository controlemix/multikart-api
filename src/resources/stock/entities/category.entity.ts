import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from "../dto/category.dto";
import { ICategoryDtoAttributes } from "../interfaces/category.interface";
import { CategoryImage } from "./category.image.entity";
import { Medias } from "src/resources/medias/entities/medias.entity";


@Table({ tableName: "category", timestamps: true })
export class Category extends Model<CategoryDto, CategoryDto> implements ICategoryDtoAttributes {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true, allowNull: false })
    id!: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for category' })
    title: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Description' })
    description: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Short description' })
    shortDescription: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Tags' })
    tags: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Meta description' })
    metaDescription: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img default url' })
    imgDefaultUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img large light url' })
    imgLargeLightUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img medium light url' })
    imgMediumLightUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img small light url' })
    imgSmallLightUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img large dark url' })
    imgLargeDarkUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img medium dark url' })
    imgMediumDarkUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Img small dark url' })
    imgSmallDarkUrl: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Path primary' })
    pathPrimary: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Path primary icon' })
    pathPrimaryIcon: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Path primary friendly' })
    pathPrimaryFriendly: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Path multi shop' })
    pathMultiShop: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Path multi shop icon' })
    pathMultiShopIcon: string;

    @Column({ allowNull: true, type: DataType.STRING })
    @ApiProperty({ example: 'resume of category', description: 'Path multi shop friendly' })
    pathMultiShopFriendly: string;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    @ApiProperty({ example: 'resume of category', description: 'Active' })
    active: boolean;

    @Column({ allowNull: true, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Active start date' })
    activeStartDate: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Active end date' })
    activeEndDate: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Active multi shop start date' })
    activeMultiShopStartDate: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Active multi shop end date' })
    activeMultiShopEndDate: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Shop primary id' })
    shopPrimaryId: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Shop multi shop id' })
    multiShopId: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    @ApiProperty({ example: 'resume of category', description: 'Active' })
    isActive: boolean;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Active multi shop end date' })
    order: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @ApiProperty({ example: 'resume of category', description: 'Parent id' })
    ranking: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ApiProperty({ example: 'Shoes', description: 'Title for category' })
    categoryName: string;

  @Column({ allowNull: true, type: DataType.STRING })
  @ApiProperty({ example: 'Shoes', description: 'Title for category' })
  multiShop: string;

  @Column({ allowNull: true, type: DataType.STRING })
  @ApiProperty({ example: 'Shoes', description: 'Title for category' })
  badge: string;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isRotate: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isFeatured: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isPopular: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isSpecial: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isTrending: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isRecommended: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isTopSelling: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isTopRated: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isFlashSale: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isDiscounted: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isFreeShipping: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isExclusive: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isOnlyAtTag: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isBuyOneGetOne: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isComingSoon: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isLimited: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isOutOfStock: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isSoldOut: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isDraft: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isPublished: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isDeleted: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isBanned: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isArchived: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isHidden: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isPrivate: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isVatIncluded: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isVatExcluded: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  isVatFree: boolean;
  
  @Column({ allowNull: true, type: DataType.INTEGER })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  userCreatedId: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  userUpdatedId: number;

  @Column({ allowNull: true, type: DataType.DATE })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  activateStartAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  @ApiProperty({ example: 'resume of category', description: 'Active' })
  activateEndAt: Date;

  @Column({ allowNull: true, type: DataType.STRING })
  @ApiProperty({ example: 'Shoes', description: 'Title for category' })
  customerGroupInclude: string;

  @Column({ allowNull: true, type: DataType.STRING })
  @ApiProperty({ example: 'Shoes', description: 'Title for category' })
  customerGroupExclude: string;

  @BelongsToMany(() => Medias,{ through: () => CategoryImage })
  medias: Medias[];

  // @HasMany(() => CategoryImage)
  // images: CategoryImage[];

  // @HasMany(() => Medias )
  // medias: Medias[];



  

  
    
}