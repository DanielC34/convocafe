import axios from 'axios';

const baseURL = process.env.SERVER_URL;

const instance = axios.create({
    baseURL: "http://localhost:8000",
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
    return response;
}, (error) => {
    const response = error.response;
    if (response.status === 403 && response.data && response.data.invalidToken) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    console.log('error', error)
    return Promise.reject(error);
});

export default instance;