import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "@/interfaces/interface";
import axios from "axios";

interface LessonState {
    lessons: Lesson[]
    loading: boolean;
    error: string | null;
}

const initialState: LessonState = {
    lessons: [],
    loading: false,
    error: null,
};

export const fetchLessons = createAsyncThunk('lessons/fetchLessons', async (courseId: number) => {
    const res = await axios.get(`http://localhost:3000/api/courses/${courseId}/lessons`);
    const data = res.data;
    return data;
})


const lessonSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLessons.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchLessons.fulfilled, (state, action: PayloadAction<Lesson[]>) => {
            state.lessons = action.payload;
            state.loading = false;
        })
        .addCase(fetchLessons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch lessons';
        })
    }
})

export default lessonSlice.reducer;