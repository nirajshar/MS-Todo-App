import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/userCreateDto.dto';
import { RegistrationStatus } from './interface/RegistrationStatus.interface';
import { UserLoginDto } from 'src/user/dto/userLogin.dto';
import { LoginStatus } from './interface/LoginStatus.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: UserCreateDto): Promise<RegistrationStatus>;
    login(userLoginDto: UserLoginDto): Promise<LoginStatus>;
    testAuth(req: any): Promise<object>;
}
