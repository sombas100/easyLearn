import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "@/api/axiosConfig";
import { RootState } from "@/redux/store"; 
import { Enrollment } from "@/interfaces/interface";

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

export const fetchEnrollments = createAsyncThunk<Enrollment[], void, { state: RootState }>(
  "enrollments/fetchEnrollments",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;

    const res = await client.get<{ enrollments: Enrollment[] }>(
      "/api/enrollments/all-enrollments",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Enrollments fetched:", res.data.enrollments);
    return res.data.enrollments;
  }
);


  

  export const updateEnrollmentProgress = createAsyncThunk(
    "enrollments/updateProgress",
    async ({ courseId, progress }: { courseId: number; progress: number }, { getState }) => {
      const state = getState() as RootState; 
      const token = state.auth.token;
  
      const res = await client.put<{ enrollment: Enrollment }>( 
        `/api/enrollments/progress`,
        { courseId, progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      return res.data.enrollment;
    }
  );

  export const enrollInCourse = createAsyncThunk(
    "enrollments/enroll", 
    async (courseId: number, { getState }) => {
      const token = (getState() as RootState).auth.token;
  
      const res = await client.post<{ enrollment: Enrollment }>( 
        "/api/enrollments/enroll",
        { courseId },
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
      .addCase(fetchEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        return {
          ...state,
          enrollments: action.payload, 
          loading: false,
        };
      })

      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch enrollments";
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
