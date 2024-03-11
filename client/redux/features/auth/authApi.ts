import { apiSlice } from "../apiSlice";
import { login, logout, register } from "./authSlice";


interface RegisterResponse {
    message: string;
    activationToken: string;
}

interface Register { }

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, Register>({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        register({
                            token: result.data.activationToken
                        })
                    )
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        activate: builder.mutation({
            query: ({ token, code }) => ({
                url: 'activate',
                method: 'POST',
                body: { token, code }
            })
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: { email, password },
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        login({
                            token: result.data.activationToken,
                            user: result.data.user
                        })
                    )
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        logout: builder.query<void, void>({
            query: () => ({
                url: 'logout',
                method: 'GET',
                credentials: 'include' as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(logout())
                } catch (error: any) {
                    console.log(error);
                }
            }
        })
    })
})

export const { useRegisterMutation, useActivateMutation, useLoginMutation, useLazyLogoutQuery } = authApi;