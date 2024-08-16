import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token
        },
        userLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.accessToken
        },
        userLogout: (state) => {
            state.user = ""
            state.token = ""
        }
    }
})

export const { userRegistration,userLogin,userLogout } = authSlice.actions

export default authSlice.reducer