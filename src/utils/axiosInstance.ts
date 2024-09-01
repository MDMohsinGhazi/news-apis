import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const createAxiosInstance = (baseURL: string, defaultParams?: Record<string, string>) => {
    const instance = axios.create({
        baseURL,
        params: {
            ...defaultParams,
        },
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add a request interceptor
    instance.interceptors.request.use(
        (config) => {
            console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        },
        (error) => {
            console.error('[Request Error]', error);
            return Promise.reject(error);
        },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        (response) => {
            console.log(`[Response] ${response.status} ${response.config.url}`);
            return response;
        },
        (error) => {
            console.error('[Response Error]', error);
            return Promise.reject(error);
        },
    );

    return instance;
};

const axiosNewsInstance = createAxiosInstance(process.env.NEWS_BASE_URL || '', {
    apikey: process.env.NEWS_API_KEY || '',
});
const axiosWeatherInstance = createAxiosInstance(process.env.WEATHER_BASE_URL || '', {
    appid: process.env.WEATHER_API_KEY || '',
});
const axiosVideoInstance = createAxiosInstance(process.env.PIXABAY_BASE_URL || '', {
    key: process.env.PIXABAY_BASE_KEY || '',
});

export { axiosNewsInstance, axiosWeatherInstance, axiosVideoInstance };
