import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: "categories", timestamps: true })
export class Category extends Model {

    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
    id!: number;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: 'shoe', description: 'Name from category' })
    category: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: 'OFJS45', description: 'SKU from category' })
    sku: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: '' })
    @ApiProperty({ example: 'src/assets/images/offer.jpg', description: 'Image for category' })
    images: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: 'Simply dummy text of the printing.' })
    @ApiProperty({ example: 'Simply dummy text of the printing.', description: 'Short description for category' })
    shortDescription: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters' })
    @ApiProperty({ example: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', description: 'Long description for category' })
    description: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: 'This is where some detailes.' })
    @ApiProperty({ example: 'This is where some detailes.', description: 'Details for category' })
    details: string;

    @Column({ allowNull: false, type: DataType.FLOAT, defaultValue: 0 })
    @ApiProperty({ example: 350.50, description: 'Sale price for category' })
    salePrice: number;

    @Column({ allowNull: false, type: DataType.FLOAT, defaultValue: 0 })
    @ApiProperty({ example: 80.50, description: 'Sale price for category' })
    price: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
    @ApiProperty({ example: false, description: 'Set sale active' })
    sale: boolean;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: "yellow; gray; black", description: 'Set colors' })
    colors: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: "SM; M; L; XL", description: 'Set sizes' })
    size: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: '' })
    @ApiProperty({ example: 'lifestyle', description: 'Set brand for category' })
    brand: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: "girls; crop top; yellow; gray; black; lifestyle", description: 'Set tags' })
    tags: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    @ApiProperty({ example: 10, description: 'Set stock for category' })
    stock: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
    @ApiProperty({ example: true, description: 'Set status' })
    status: boolean;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
    @ApiProperty({ example: 'Polo T-shirt', description: 'Set name' })
    name: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    @ApiProperty({ example: 3, description: 'Set quantity for category' })
    quantity: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
    @ApiProperty({ example: true, description: 'Set category active' })
    isActive?: boolean;

}

