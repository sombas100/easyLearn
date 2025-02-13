import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/redux/store"; 

interface Enrollment {
  enrollmentId: number;
  user: { name: string; email: string };
  course: { title: string };
  progress: number;
  certificateUrl?: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  loading: false,
  error: null,
};


export const fetchEnrollments = createAsyncThunk(
  "enrollments/fetchEnrollments",
  async (_, { getState }) => {
    const state = getState() as RootState; 
    const token = state.auth.token;

    const res = await axios.get("http://localhost:3000/api/enrollments/all-enrollments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);


export const updateEnrollmentProgress = createAsyncThunk(
  "enrollments/updateProgress",
  async ({ courseId, progress }: { courseId: number; progress: number }, { getState }) => {
    const state = getState() as RootState; 
    const token = state.auth.token;

    const res = await axios.put(
      `http://localhost:3000/api/enrollments/progress`,
      { courseId, progress },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.enrollment;
  }
);

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.enrollments = action.payload;
        state.loading = false;
      })
      .addCase(updateEnrollmentProgress.fulfilled, (state, action: PayloadAction<Enrollment>) => {
        const index = state.enrollments.findIndex(e => e.enrollmentId === action.payload.enrollmentId);
        if (index !== -1) {
          state.enrollments[index] = action.payload;
        }
      });
  },
});

export default enrollmentSlice.reducer;
