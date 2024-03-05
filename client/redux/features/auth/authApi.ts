import { apiSlice } from "../api/apiSlice";
import { register } from "./authSlice";


interface RegisterResponse {
    message: string;
    activationToken: string;
}

interface Register {}

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
    })
})

export const { useRegisterMutation, useActivateMutation } = authApi;