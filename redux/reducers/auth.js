import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loader: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        UserExists: (state, action) => {
            state.user = action.payload
            state.loader = false
        },
        UserNotExists: (state) => {
            state.user = null
            state.loader = false
        },
    }
})

export const { UserExists, UserNotExists } = authSlice.actions
export default authSlice;