import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";
import { client } from "@/api/axiosConfig";
import { User } from "@/interfaces/interface";
import { RootState } from "../store";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const res = await client.get("/api/users", {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

  return res.data;
});


export const deleteUser = createAsyncThunk("users/deleteUser", async (id: number, { getState }) => {
    const token = (getState() as RootState).auth.token; 
    if (!token) {
        throw new Error("No authentication token found.");
    }

    await client.delete(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    return id;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.userId !== action.payload);
      });
  },
});

export default userSlice.reducer;
