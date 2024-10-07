import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import authReducer from './authSlice'
import darkModeReducer from './darkMode'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        darkMode: darkModeReducer
    },
})