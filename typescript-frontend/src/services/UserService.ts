import Http from "./HttpService";
import config from "../config.json";
import AuthService from "./AuthService";

const apiEndpoint = config.apiEndpoint + 'users';

export const getUsers = () => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint)
}

export const getUser = (userId: string|number) => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint + `/${userId}`)
}

export const createUser = (data: FormData) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint, data)
}

export const updateUser = (userId: string|number, data: FormData) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${userId}`, data)
}

export const changeUserStatus = (userId: string|number) => {
    Http.setToken(AuthService.getToken())
    
    return Http.post(apiEndpoint + `/${userId}/change-status`);
}

export const deleteUser = (userId: string|number) => {
    Http.setToken(AuthService.getToken())
    
    return Http.delete(apiEndpoint + `/${userId}`);
}

export default {
    getUsers,
    changeUserStatus,
    deleteUser,
    getUser,
    createUser,
    updateUser,
}