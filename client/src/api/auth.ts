import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
}

export const registerUser = async (name: string, email: string, password: string) => {
    const res = await axios.post(`${API_URL}/register`, { name, password, email });
    return res.data;
}