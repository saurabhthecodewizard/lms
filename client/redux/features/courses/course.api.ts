import CourseBasic from "@/redux/interfaces/courses/courseBasic.interface";
import { apiSlice } from "../apiSlice";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";

interface AllCoursesResponse {
    success: boolean;
    courses: CourseBasic[];
}

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
        fetchAllCourses: builder.query<AllCoursesResponse, void>({
            query: () => ({
                url: 'courses/all',
                method: 'GET',
                credentials: 'include' as const
            })
        })
    })
})

export const { useCreateCourseMutation, useFetchAllCoursesQuery } = courseApi