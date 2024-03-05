import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: '',
    user: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            state.token = action.payload.token;
        },
        login: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = '';
            state.user = '';
        }
    }
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;