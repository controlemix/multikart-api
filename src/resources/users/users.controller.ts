import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam
} from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiParam({
    type: User,
    description: "The create user",
    name: "active",
    example: 1,
    required: true,
    
  })

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 403, description: "Forbidden request forbidden by administrative rules."  })
  @ApiResponse({ status: 201, description: "Created success the request has succeeded." })
  @ApiResponse({ status: 404, description: "The requested resource is not found." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
