import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import lessonReducer from './slices/lessonSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer,
        lessons: lessonReducer,
        users: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;