import Http from "./HttpService";
import config from "../config.json";
import AuthService from "./AuthService";

const apiEndpoint = config.apiEndpoint + 'roles';

export const getRoles = () => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint)
}

export const getRole = (roleId) => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint + `/${roleId}`)
}

export const createRole = (data) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint, data)
}

export const updateRole = (roleId, data) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${roleId}`, data)
}

export const changeRoleStatus = (roleId) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${roleId}/change-status`);
}

export const deleteRole = (roleId) => {
    Http.setToken(AuthService.getToken())
    
    return Http.delete(apiEndpoint + `/${roleId}`);
}

export const assignRolePermission = (roleId, permission) => {
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