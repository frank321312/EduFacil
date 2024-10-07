import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        asignarRol: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { asignarRol } = authSlice.actions

export default authSlice.reducer