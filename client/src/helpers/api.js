import axios from 'axios';

import LocalStorageService from '../services/storage/StorageService';

const API_URL = 'http://localhost:8080/api';

const axiosApi = axios.create({
    baseURL: API_URL,
});

axiosApi.interceptors.request.use(
    config => {
        if (config.url !== '/login' && config.url !== '/signUp') {
            const token = LocalStorageService.getAccessToken();
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export async function get(url, config = {}) {
    return await axiosApi
        .get(url, { ...config })
        .then(response => response)
        .catch(error => error.response);
}

export async function post(url, data, config = {}) {
    return axiosApi
        .post(url, { ...data }, { ...config })
        .then(response => response)
        .catch(error => error.response);
}

export async function put(url, data, config = {}) {
    return axiosApi
        .put(url, { ...data }, { ...config })
        .then(response => response)
        .catch(error => error.response);
}

export async function patch(url, data, config = {}) {
    return axiosApi
        .patch(url, { ...data }, { ...config })
        .then(response => response)
        .catch(error => error.response);
}

export async function del(url, config = {}) {
    return await axiosApi
        .delete(url, { ...config })
        .then(response => response)
        .catch(error => error.response);
}
