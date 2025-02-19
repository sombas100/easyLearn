import axios from "axios";

const API = import.meta.env.VITE_API_URL

export const client = axios.create({
    baseURL: `${API}`,
    headers: {
        "Content-Type": "application/json"
    },
});

client.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)