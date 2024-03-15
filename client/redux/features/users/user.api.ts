import UserBasic from "@/redux/interfaces/users/userBasic.interface";
import { apiSlice } from "../apiSlice";

interface AllUsersResponse {
    success: boolean;
    users: UserBasic[];
}

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllUsers: builder.query<AllUsersResponse, void>({
            query: () => ({
                url: 'users/all',
                method: 'GET',
                credentials: 'include' as const
            })
        })
    })
})

export const { useFetchAllUsersQuery } = usersApi;