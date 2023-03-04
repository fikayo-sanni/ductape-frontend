import axios, { AxiosInstance, CancelToken } from 'axios';
import { ACTIONS_BASE_URL, APPS_BASE_URL, PRICING_BASE_URL } from '../config/urls';

const source = new axios.CancelToken.source();
const requestInterceptor = async (config) => {
    config.cancelToken = source.token;
    return config;
};
let instance;

export const pricingClient = (auth, contentType) => {
    if (instance) return instance;
    instance = axios.create({
        baseURL: PRICING_BASE_URL,
        timeout: 15000,
        headers: {
            'Content-Type': contentType,
            Authorization: auth,
        },
        withCredentials: false,
    });

    // @ts-ignore
    instance.interceptors.request.use(requestInterceptor);
    return instance;
};
