'use client';

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import authSlice from "./features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import sidebarSlice from "./features/sidebar/sidebar.slice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        sidebar: sidebarSlice,
    },
    devTools: false,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(apiSlice.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Calling refresh token on every refresh
const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true, subscriptionOptions: { pollingInterval: 1000 * 60 * 4 } }));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({} as any, { forceRefetch: true }));
};

initializeApp();