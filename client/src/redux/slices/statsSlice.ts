import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "@/api/axiosConfig";
import { RootState } from "../store";

interface AdminStats {
    users: number;
    courses: number;
    enrollments: number;
}

interface AdminState {
    stats: AdminStats | null;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState =  {
    stats: null,
    loading: false,
    error: null,
}

export const fetchStats = createAsyncThunk("admin/fetchStats", async (_, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const res = await client.get("/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as AdminStats
  });

  const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStats.fulfilled, (state, action: PayloadAction<AdminStats>) => {
                state.stats = action.payload;
                state.loading = false;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch statistics'
            })
    }
  })

  export default statsSlice.reducer