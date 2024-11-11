import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkMode';
import loginReducer from './loginSlice';
import horarioReduce from './horarioSlice';

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        login: loginReducer,
        horario: horarioReduce
    },
})