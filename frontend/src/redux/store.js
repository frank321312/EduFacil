import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkMode';
import loginReducer from './loginSlice';

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        login: loginReducer
    },
})