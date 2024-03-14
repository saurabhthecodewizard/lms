import { apiSlice } from "../apiSlice";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation<void, CreateCourse>({
            query: (data) => ({
                url: 'course',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            })
        }),
    })
})

export const { useCreateCourseMutation } = courseApi