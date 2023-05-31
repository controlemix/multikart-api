import { Injectable, Inject } from '@nestjs/common';
import { MENUS_SELF_CHILDREN_REPOSITORY } from '../../../core/constants';
import { CreateMenuSelfChildrenDto } from './dto/create-menu-self-childrens.dto';
import { MenuSelfChildren } from './entities/menu-self-childrens.entity';
import { MenuChildren } from 'src/resources/menus/entities/menu-children.entity';

@Injectable()
export class MenusSelfChildrensService {
  constructor(@Inject(MENUS_SELF_CHILDREN_REPOSITORY) private menuSelfChildrenRepository: typeof MenuSelfChildren) {}

  async create(createMenuSelfChildrenDto: CreateMenuSelfChildrenDto): Promise<CreateMenuSelfChildrenDto> {
    try {
      const count = await MenuSelfChildren.count();
      const order =
      createMenuSelfChildrenDto?.order && createMenuSelfChildrenDto?.order > 0
          ? createMenuSelfChildrenDto?.order
          : count + 1;
      return await this.menuSelfChildrenRepository.create(
        {...createMenuSelfChildrenDto, order},
        {
          include: [ MenuChildren ]
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<MenuSelfChildren[]> {
    return await this.menuSelfChildrenRepository.findAll(
      {
        // include: [{ model: MenuChildren, as: 'children' }],
        order: [
          ['order', 'ASC'],
        ],
      }
    );
  }

  
}
