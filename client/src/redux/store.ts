import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import lessonReducer from './slices/lessonSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer,
        lessons: lessonReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;