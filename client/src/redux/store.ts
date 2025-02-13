import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import lessonReducer from './slices/lessonSlice';
import userReducer from './slices/userSlice';
import enrollmentReducer from './slices/enrollmentSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer,
        lessons: lessonReducer,
        users: userReducer,
        enrollments: enrollmentReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;