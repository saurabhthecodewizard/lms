import UserProfile from "@/redux/interfaces/userProfile.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: () => ({
                url: 'refresh',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        loadUser: builder.query<{ success: boolean, user: UserProfile }, void>({
            query: () => ({
                url: 'profile',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
    })
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;