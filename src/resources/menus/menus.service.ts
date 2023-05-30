import { Injectable, Inject } from '@nestjs/common';
import {
  MENUS_CHILDREN_REPOSITORY,
  MENUS_REPOSITORY,
} from '../../core/constants';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, MenuChildren } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @Inject(MENUS_REPOSITORY) private menusRepository: typeof Menu,
    @Inject(MENUS_CHILDREN_REPOSITORY)
    private menuChildrensRepository: typeof MenuChildren,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<CreateMenuDto> {
    return await this.menusRepository.create({ ...createMenuDto });
  }

  async createChildren(createMenuDto: CreateMenuDto): Promise<CreateMenuDto> {
    return await this.menuChildrensRepository.create({ ...createMenuDto });
  }

  async findAll(): Promise<Menu[]> {
    return await this.menusRepository.findAll({ include: [MenuChildren] });
  }

  async findChildrenAll(): Promise<MenuChildren[]> {
    return await this.menuChildrensRepository.findAll();
  }

  async findOne(id: string): Promise<Menu> {
    return await this.menusRepository.findByPk(id, { include: [MenuChildren] });
  }

  async findChildrenOne(id: string): Promise<MenuChildren> {
    return await this.menuChildrensRepository.findByPk(id);
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
