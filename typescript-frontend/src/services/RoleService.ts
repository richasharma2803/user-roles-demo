import Http from "./HttpService";
import config from "../config.json";
import AuthService from "./AuthService";

const apiEndpoint = config.apiEndpoint + 'roles';

export const getRoles = () => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint)
}

export const getRole = (roleId: string | number) => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint + `/${roleId}`)
}

export const createRole = (data : FormData) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint, data)
}

export const updateRole = (roleId : string | number, data: FormData) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${roleId}`, data)
}

export const changeRoleStatus = (roleId: number) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${roleId}/change-status`);
}

export const deleteRole = (roleId: number) => {
    Http.setToken(AuthService.getToken())
    
    return Http.delete(apiEndpoint + `/${roleId}`);
}

export const assignRolePermission = (roleId: string | number, permission: FormData) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${roleId}/role-permissions`, permission)
}

export const getRolePermissions = () => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(config.apiEndpoint + 'roles-permissions')
}

export default {
    getRoles,
    changeRoleStatus,
    deleteRole,
    getRole,
    createRole,
    updateRole,
    assignRolePermission,
    getRolePermissions,
}