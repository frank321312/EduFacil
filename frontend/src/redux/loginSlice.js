import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nombreUsuario: "",
    idEscuela: 2,
    idRol: 0,
    idUsuario: 0
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        autenticar: (state, action) => {
            state.nombreUsuario = action.payload.nombre,
                state.idEscuela = action.payload.idEscuela,
                state.idRol = action.payload.idRol
            state.idUsuario = action.payload.idUsuario
        }
    }
})

export const { autenticar } = loginSlice.actions
export default loginSlice.reducer