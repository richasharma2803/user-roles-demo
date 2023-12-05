import Http from "./HttpService";
import config from "../config.json";
import { decryptData } from "../common/cryptoHelpers";
import { LocalStorageUserType, UserDataType } from "../Types";

const apiEndpoint = config.apiEndpoint;

export const login = (data: FormData) => {
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

const decryptUserInfoData = ():UserDataType | null => {
    // let data = JSON.parse(localStorage.getItem('user'))
    
    // return data ? decryptData(data?.encryptedData, data?.iv) : null

    const storedData = localStorage.getItem('user');
 
    if (storedData !== null) {
        const data: LocalStorageUserType = JSON.parse(storedData);
        return decryptData(data);
    }
    
    return null
}

export const getCurrentUser = () => {
    return decryptUserInfoData();
}

export const getToken = () => {
    return localStorage.getItem('token') || ''
}

export default {
    login,
    logout,
    getCurrentUser,
    getToken,
}