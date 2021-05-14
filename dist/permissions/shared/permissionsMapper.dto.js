"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPermissionsDto = void 0;
const toPermissionsDto = (data) => {
    const { id, name, createdAt } = data;
    let rolesDto = { id, name, createdAt };
    return rolesDto;
};
exports.toPermissionsDto = toPermissionsDto;
//# sourceMappingURL=permissionsMapper.dto.js.map