import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { Course } from "@/interfaces/interface";

interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
}

const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null,
}

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const res = await axios.get('http://localhost:3000/api/courses');
    const data = res.data;
    return data
})

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.courses = action.payload;
                state.loading = false;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch courses';
            })
    }
})

export default courseSlice.reducer;

