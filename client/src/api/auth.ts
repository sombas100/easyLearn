import { client } from "./axiosConfig";

export interface AuthResponse {
    user: {
      userId: number;
      name: string;
      email: string;
      role: "Admin" | "Learner";
    };
    token: string;
  }

  export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await client.post<AuthResponse>(`/api/auth/login`, { email, password });
    return res.data; 
  };
  

export const registerUser = async (name: string, email: string, password: string) => {
    const res = await client.post(`api/auth/register`, { name, password, email });
    return res.data;
}