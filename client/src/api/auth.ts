import { client } from "./axiosConfig";



export const loginUser = async (email: string, password: string) => {
    const res = await client.post(`/login`, { email, password });
    return res.data;
}

export const registerUser = async (name: string, email: string, password: string) => {
    const res = await client.post(`/register`, { name, password, email });
    return res.data;
}