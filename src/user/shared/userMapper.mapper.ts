import { UserDto } from "../dto/userDto.dto";
import { UserEntity } from "../entity/user.entity";



export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email, role } = data;
    let userDto: UserDto = { id, username, email, role };
    return userDto;
};