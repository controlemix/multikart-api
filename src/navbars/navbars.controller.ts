import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";

import { CreateNavbarDto } from "./dto/create-navbar.dto";
import { UpdateNavbarDto } from "./dto/update-navbar.dto";
import { NavbarsService } from "./navbars.service";
import { Navbar } from "./entities/navbar.entity";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam
} from "@nestjs/swagger";

@ApiTags("navbars")
@Controller("api/navbars")
export class NavbarsController {
  constructor(private readonly navbarsService: NavbarsService) {}

  @Post()
  @ApiParam({
    type: Navbar,
    description: "The active in shop of the NavBar",
    name: "active",
    example: 1,
    required: true
  })
  @ApiOperation({ summary: "Create navbar" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  create(@Body() createNavbarDto: CreateNavbarDto): Promise<Navbar> {
    return this.navbarsService.create(createNavbarDto);
  }

  @Get()
  findAll(): Promise<Navbar[]> {
    return this.navbarsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Navbar> {
    return this.navbarsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateNavbarDto: UpdateNavbarDto) {
    return this.navbarsService.update(+id, updateNavbarDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.navbarsService.remove(id);
  }
}
