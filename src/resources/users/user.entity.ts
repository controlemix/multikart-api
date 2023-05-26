import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Rules } from "./dto/user.dto";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {

  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  @ApiProperty({ example: 'Jhon', description: 'Name for user' })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  @ApiProperty({ example: 'email@gmail.com', description: 'Email for user' })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  @ApiProperty({ example: '12345678', description: 'Password for login user' })
  password: string;

  @Column({ allowNull: false, type: DataType.ENUM('male', 'female', 'neutral') })
  @ApiProperty({ example: 'male', description: 'Gender user' })
  gender: Gender;

  @Column({ allowNull: false, type: DataType.ENUM('superadmin', 'admin', 'customer') })
  @ApiProperty({ example: 'customer', description: 'Rule ACL for user' })
  rules: Rules;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  @ApiProperty({ example: true, description: 'Set user active' })
  isActive?: boolean;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
  @ApiProperty({ example: true, description: 'Set user email validate' })
  isValidate: boolean;

  @Column({ defaultValue: '', type: DataType.STRING })
  lastAccess: string;
}
