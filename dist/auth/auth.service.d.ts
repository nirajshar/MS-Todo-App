import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/user/dto/userCreateDto.dto';
import { UserDto } from 'src/user/dto/userDto.dto';
import { UserLoginDto } from 'src/user/dto/userLogin.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginStatus } from './interface/LoginStatus.interface';
import { RegistrationStatus } from './interface/RegistrationStatus.interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(userCreateDto: UserCreateDto): Promise<RegistrationStatus>;
    login(userLoginDto: UserLoginDto): Promise<LoginStatus>;
    validateUser(payload: JwtPayload): Promise<UserDto>;
    getUserDetails(req: any): Promise<object>;
    private _createToken;
}
