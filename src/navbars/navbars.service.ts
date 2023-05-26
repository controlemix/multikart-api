import { Injectable, Inject } from "@nestjs/common";
import { CreateNavbarDto } from "./dto/create-navbar.dto";
import { UpdateNavbarDto } from "./dto/update-navbar.dto";
import { Navbar } from "./entities/navbar.entity";

@Injectable()
export class NavbarsService {
  constructor(
    @Inject("NAVBARS_REPOSITORY")
    private navbarsRepository: typeof Navbar
  ) {}

  create(createNavbarDto: CreateNavbarDto): Promise<Navbar> {
    return this.navbarsRepository.create({
      active: createNavbarDto.active,
      openMobileNav: createNavbarDto.openMobileNav,
      subNav: createNavbarDto.subNav,
      activeItem: createNavbarDto.activeItem,
      activeChildItem: createNavbarDto.activeChildItem,
      activeMegaChild: createNavbarDto.activeMegaChild,
      leftSideBarVal: createNavbarDto.leftSideBarVal,
      title: createNavbarDto.title,
      type: createNavbarDto.type,
      badgeValue: createNavbarDto.badgeValue
    });
  }

  async findAll(): Promise<Navbar[]> {
    return this.navbarsRepository.findAll();
  }

  findOne(id: string): Promise<Navbar> {
    return this.navbarsRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateNavbarDto: UpdateNavbarDto) {
    return this.navbarsRepository.upsert({
      id,
      active: updateNavbarDto.active,
      openMobileNav: updateNavbarDto.openMobileNav,
      subNav: updateNavbarDto.subNav,
      activeItem: updateNavbarDto.activeItem,
      activeChildItem: updateNavbarDto.activeChildItem,
      activeMegaChild: updateNavbarDto.activeMegaChild,
      leftSideBarVal: updateNavbarDto.leftSideBarVal,
      title: updateNavbarDto.title,
      type: updateNavbarDto.type,
      badgeValue: updateNavbarDto.badgeValue
    });
  }

  async remove(id: string): Promise<void> {
    const navbar = await this.findOne(id);
    await navbar.destroy();
  }
}
