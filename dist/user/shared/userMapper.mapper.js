"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDto = void 0;
const toUserDto = (data) => {
    const { id, username, email, role } = data;
    let userDto = { id, username, email, role };
    return userDto;
};
exports.toUserDto = toUserDto;
//# sourceMappingURL=userMapper.mapper.js.map