import axios from 'axios';

const baseURL = process.env.SERVER_URL;

const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

instance.interceptors.response.use((response) => {
    if (response.status === 401 && response.headers['X_Invalidate_Token']) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return response;
});

export default instance;