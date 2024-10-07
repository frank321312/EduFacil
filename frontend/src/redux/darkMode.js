import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    class: "mode-dark",
    active: false
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        activeModeDark: (state, action) => {
            state.class = "value-defect"
            state.active = true
        },

        deactivateModeDark: (state, action) => {
            state.class = "mode-dark"
            state.active = false
        }
    }
})

export const { activeModeDark, deactivateModeDark } = darkModeSlice.actions
export default darkModeSlice.reducer