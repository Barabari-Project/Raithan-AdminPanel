import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com', // Default base URL
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Example: Add an Authorization token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response) {
            // Example: Redirect to login if 401 Unauthorized
            if (error.response.status === 401) {
                console.error('Unauthorized. Redirecting to login...');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
