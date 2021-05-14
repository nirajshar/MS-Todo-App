"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRolesDto = void 0;
const toRolesDto = (data) => {
    const { id, name, createdAt } = data;
    let rolesDto = { id, name, createdAt };
    return rolesDto;
};
exports.toRolesDto = toRolesDto;
//# sourceMappingURL=rolesMapper.dto.js.map