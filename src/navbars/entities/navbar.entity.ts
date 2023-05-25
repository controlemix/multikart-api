import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey
} from "sequelize-typescript";

export interface navbarsAttributes {
  id: number;
  active?: number;
  openMobileNav?: number;
  subNav?: number;
  activeItem?: string;
  activeChildItem?: string;
  activeMegaChild?: string;
  leftSideBarVal?: number;
  title?: string;
  type?: string;
  badgeValue?: string;
}

@Table({ tableName: "Navbars", timestamps: false })
export class Navbar
  extends Model<navbarsAttributes, navbarsAttributes>
  implements navbarsAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  id!: number;
  @Column({ allowNull: true, type: DataType.TINYINT })
  active?: number;
  @Column({ allowNull: true, type: DataType.TINYINT })
  openMobileNav?: number;
  @Column({ allowNull: true, type: DataType.TINYINT })
  subNav?: number;
  @Column({ allowNull: true, type: DataType.STRING })
  activeItem?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  activeChildItem?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  activeMegaChild?: string;
  @Column({ allowNull: true, type: DataType.TINYINT })
  leftSideBarVal?: number;
  @Column({ allowNull: true, type: DataType.STRING })
  title?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  type?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  badgeValue?: string;
}
