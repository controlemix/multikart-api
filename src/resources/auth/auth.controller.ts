import { Controller, Body, Post, UseGuards, Request, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { Public, Resource, RoleMatchingMode, Roles, Scopes, Unprotected } from 'nest-keycloak-connect';

// @UseGuards(AuthGuard('local'))

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Request() req: any) {
        return await this.authService.login(req.user);
    }

    @Public()
    @Post('app/token')
    async createAppToken(@Body() data: any, @Response() res: any ): Promise<any> {    
        const token = await this.authService.createAppToken(data);
        return res.status(200).json({
            statusCode: 200,
            status: "OK",
            message: "The request created has succeeded.",
            data: token
        });  
    }

    @Post('signup')
    @UseGuards(DoesUserExist)
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}
