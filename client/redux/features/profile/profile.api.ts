import UpdateProfile from "@/redux/interfaces/updateProfile.interface";
import { apiSlice } from "../apiSlice";
import UpdatePassword from "@/redux/interfaces/updatePassword.interface";

export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation<void, UpdateProfile>({
            query: (data) => ({
                url: 'profile',
                method: 'PUT',
                body: data,
                credentials: 'include' as const
            })
        }),
        updateAvatar: builder.mutation<void, string>({
            query: (avatar) => ({
                url: 'avatar',
                method: 'PUT',
                body: { avatar },
                credentials: 'include' as const
            })
        }),
        changePassword: builder.mutation<void, UpdatePassword>({
            query: (data) => ({
                url: 'password',
                method: 'PUT',
                body: data,
                credentials: 'include' as const
            })
        })
    })
})

export const { useUpdateProfileMutation, useUpdateAvatarMutation, useChangePasswordMutation } = profileApi;