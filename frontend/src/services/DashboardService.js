import Http from "./HttpService";
import config from "../config.json";
import AuthService from "./AuthService";

const apiEndpoint = config.apiEndpoint;

export const getdashboardCardData = () => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint + 'dashboard-card-data');
}

export const getdashboardChartData = () => {
    Http.setToken(AuthService.getToken())
    
    return Http.get(apiEndpoint + 'dashboard-chart-data');
}

export default {
 getdashboardCardData,
 getdashboardChartData,
}