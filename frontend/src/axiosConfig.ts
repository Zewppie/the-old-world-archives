import axios from 'axios';

// axios configuration to use interceptors
// import axios from this file in other scripts
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

// interceptor to handle user session
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
