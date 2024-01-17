import axios from "axios";
const BASE_URL = '';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem('token');
    if(accessToken){
        if(config) config.headers.token = accessToken;
    }
    return config;
},(error)=> {
    return Promise.reject(error)
});

