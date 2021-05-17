import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/user/dto/userCreateDto.dto';
import { UserDto } from 'src/user/dto/userDto.dto';
import { UserLoginDto } from 'src/user/dto/userLogin.dto';
import { toUserDto } from 'src/user/shared/userMapper.mapper';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginStatus } from './interface/LoginStatus.interface';
import { RegistrationStatus } from './interface/RegistrationStatus.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    async register(userCreateDto: UserCreateDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            status: 'success',
            message: 'User registered successfully',
        };

        try {
            await this.userService.create(userCreateDto);
        } catch (err) {
            status = {
                status: 'failure',
                message: err
            }
        }

        return status;
    }

    async login(userLoginDto: UserLoginDto): Promise<LoginStatus> {
        const user = await this.userService.findByLogin(userLoginDto);

        const token = this._createToken(user);

        return {
            username: user.username,
            ...token
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);

        if (!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Invalid Token'
            }, HttpStatus.UNAUTHORIZED)
        }

        return user;

    }

    async getUserDetails(req: any): Promise<object> {

        const { username } = req.user;

        const user = await this.userService.findOne({ username });

        if (!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Invalid Token'
            }, HttpStatus.UNAUTHORIZED)
        }


        return user;
    }

    private _createToken({ username, role }: UserDto): any {

        const expiresIn = process.env.EXPIRES_IN || '1h';

        const user: JwtPayload = { username };

        if (role !== null) {
            user.role_id = role.id;
        }

        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn,
            accessToken
        }
    }

    async getAuthUser(req: any): Promise<object> {

        const { username } = req.user;

        let user = await this.userService.findOne({ where: { username }, relations: ['role'] });

        if (!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Invalid Token'
            }, HttpStatus.UNAUTHORIZED)
        }

        if(user.role !== null) {
            user.role_id = user.role.id;
            delete user.role;
        }
        
        return user;
    }
}
