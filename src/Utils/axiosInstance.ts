// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.BASE_URL}/raithan/api/admin/auth/login`,
});

// Request interceptor to add the JWT token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;