import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "@/api/axiosConfig";
import { Course } from "@/interfaces/interface";
import { RootState } from "../store";

interface CourseState {
    courses: Course[];
    searchResults: Course[]
    loading: boolean;
    error: string | null;
}

const initialState: CourseState = {
    courses: [],
    searchResults: [],
    loading: false,
    error: null,
}

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const res = await client.get('/api/courses');
    const data = res.data;
    return data
})

export const fetchCourseById = createAsyncThunk(
    'courses/fetchCourseById',
    async (courseId: string) => {
        const res = await client.get(`/api/courses/${courseId}`);
        return res.data;
    }
);

export const addCourse = createAsyncThunk(
    "courses/addCourse",
    async (courseData: Omit<Course, "courseId">, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (!token) throw new Error("No authentication token found");
  
      const res = await client.post("/api/courses", courseData, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
  
      return res.data;
    }
  );

  export const updateCourse = createAsyncThunk(
    "courses/updateCourse",
    async ({ id, courseData }: { id: number; courseData: Partial<Course> }, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
  
      const res = await client.put(
        `/api/courses/${id}`,
        courseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      return res.data;
    }
  );
export const deleteCourse = createAsyncThunk(
    "courses/deleteCourse",
    async (id: number, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token; 
  
      if (!token) {
        throw new Error("No token found, authorization denied.");
      }
  
      await client.delete(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
  
      return id;
    }
  );

export const searchCourses = createAsyncThunk(
    'courses/searchCourses',
    async (query: string) => {
        try {
            console.log("Searching courses for:", query);
            const res = await client.get(`/api/courses/search?query=${query}`);
            return res.data;
            
        } catch (error: any) {
            console.error('error', error.message)   
        }
    }
);

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
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
                state.loading = false;
                state.courses = [action.payload]; 
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch course';
            })
            .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<number>) => {
                state.courses = state.courses.filter((course) => course.courseId !== action.payload);
            })
            .addCase(addCourse.fulfilled, (state, action: PayloadAction<Course>) => {
                state.courses.push(action.payload);
            })
            .addCase(searchCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.searchResults = action.payload;
                state.loading = false;
            })
            .addCase(searchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Search failed';
            })
            
            .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
                const index = state.courses.findIndex((course) => course.courseId === action.payload.courseId);
                if (index !== -1) {
                  state.courses[index] = action.payload; 
                }
              })
              
    }
})

export default courseSlice.reducer;

