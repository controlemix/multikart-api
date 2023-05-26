import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Patch } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
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
@Controller("navbars")
export class NavbarsController {
  constructor(private readonly navbarsService: NavbarsService) { }

  @Post()
  @ApiParam({
    type: Navbar,
    description: "The active in shop of the NavBar",
    name: "active",
    example: 1,
    required: true
  })
  @ApiOperation({ summary: "Create NavBar" })
  @ApiResponse({ status: 403, description: "Forbidden request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "Created success the request has succeeded." })
  @ApiResponse({ status: 404, description: "The requested resource is not found." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  create(@Body() createNavbarDto: CreateNavbarDto): Promise<Navbar> {
    return this.navbarsService.create(createNavbarDto);
  }

  @UseGuards(AuthGuard('jwt'))
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
