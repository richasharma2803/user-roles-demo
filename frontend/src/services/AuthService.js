import Http from "./HttpService";
import config from "../config.json";
import { decryptData } from "../common/cryptoHelpers";

const apiEndpoint = config.apiEndpoint;

export const login = (data) => {
    let apiURL = ''

    apiURL = apiEndpoint + 'login'

    return Http.post(apiURL, data)
}

export const logout = () => {
    let apiURL = ''

    Http.setToken(getToken())
    apiURL = apiEndpoint + 'logout'

    return Http.post(apiURL)
}

const decryptUserInfoData = () => {
    let data = JSON.parse(localStorage.getItem('user'))
    
    return data ? decryptData(data?.encryptedData, data?.iv) : null
}

export const getCurrentUser = () => {
    return decryptUserInfoData();
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export default {
    login,
    logout,
    getCurrentUser,
    getToken,
}