import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "@/interfaces/interface";
import { client } from "@/api/axiosConfig";


interface LessonState {
    lessons: Lesson[]
    lesson: Lesson | null
    loading: boolean;
    error: string | null;
}

const initialState: LessonState = {
    lessons: [],
    lesson: null,
    loading: false,
    error: null,
};

export const fetchLessons = createAsyncThunk('lessons/fetchLessons', async (courseId: number) => {
    const res = await client.get(`/api/courses/${courseId}/lessons`);
    const data = res.data;
    return data;
})

export const fetchLessonById = createAsyncThunk('lessons/fetchLessonById', async (lessonId: number) => {
    const res = await client.get(`/api/lessons/${lessonId}`)
    const data = res.data;
    return data
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
        .addCase(fetchLessonById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchLessonById.fulfilled, (state, action: PayloadAction<Lesson>) => {
            state.lesson = action.payload;
            state.loading = false;
        })
        .addCase(fetchLessonById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch lesson'
        })
    }
})

export default lessonSlice.reducer;