import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    horario: []
}

const horarioSlice = createSlice({
    name: "horario",
    initialState,
    reducers: {
        selectHorario: (state, action) => {
            state.horario = action.payload
        }
    }
})

export const { selectHorario } = horarioSlice.actions
export default horarioSlice.reducer