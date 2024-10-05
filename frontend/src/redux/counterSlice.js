import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incrementar: (estado) => {
            estado.value += 1
        },

        decrementar: (estado) => {
            estado.value -= 1
        },

        incrementarPorCantidad: (estado, action) => {
            estado.value += action.payload
        }
    }
})

export const { incrementar, decrementar, incrementarPorCantidad } = counterSlice.actions

export default counterSlice.reducer