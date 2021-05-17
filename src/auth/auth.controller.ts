import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/userCreateDto.dto';
import { RegistrationStatus } from './interface/RegistrationStatus.interface';
import { UserLoginDto } from 'src/user/dto/userLogin.dto';
import { LoginStatus } from './interface/LoginStatus.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    // Register User 
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 409, description: 'Username already exist' })
    @Post('register')
    public async register(@Body() createUserDto: UserCreateDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto);

        if (result.status === 'failure') {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: result.message
            }, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    // Login user using Username & Password
    @ApiResponse({ status: 200, description: 'User logged in' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Post('login')
    public async login(@Body() userLoginDto: UserLoginDto): Promise<LoginStatus> {
        return await this.authService.login(userLoginDto);
    }

    @ApiResponse({ status: 200, description: 'User details' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @Get('whoami')
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async testAuth(@Req() req: any): Promise<object> {
        return await this.authService.getUserDetails(req);
    }

    @ApiResponse({ status: 200, description: 'Get Auth User details' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @Get('get-user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAuthUser(@Req() req: any): Promise<object> {
        return await this.authService.getAuthUser(req);
    }

}
