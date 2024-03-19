import CourseBasic from "@/redux/interfaces/courses/courseBasic.interface";
import { apiSlice } from "../apiSlice";
import CourseInfo from "@/redux/interfaces/courses/courseInfo.interface";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";
import EnrolledCourseData from "@/redux/interfaces/courses/enrolledCourseData.interface";

interface AllCoursesResponse {
    success: boolean;
    courses: CourseBasic[];
}

interface AllEnrolledCoursesResponse {
    success: boolean;
    content: string[];
}

interface CourseInfoResponse {
    success: boolean;
    course: CourseInfo;
}

interface EnrolledCourseDataResponse {
    success: boolean;
    content: EnrolledCourseData[];
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
        }),
        fetchAvailableCourses: builder.query<AllCoursesResponse, void>({
            query: () => ({
                url: 'courses',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        fetchAllEnrolledCourses: builder.query<AllEnrolledCoursesResponse, void>({
            query: () => ({
                url: 'course/enrolled/all',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        fetchCourse: builder.query<CourseInfoResponse, string>({
            query: (courseId) => ({
                url: `course/${courseId}`,
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        fetchEnrolledCourseData: builder.query<EnrolledCourseDataResponse, string>({
            query: (courseId) => ({
                url: `course/${courseId}/enrolled`,
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        updateCourse: builder.mutation<void, { courseId: string, course: CreateCourse }>({
            query: (data) => ({
                url: `course/${data.courseId}`,
                method: 'PUT',
                body: data.course,
                credentials: 'include' as const
            })
        }),
    })
})

export const { useCreateCourseMutation, useFetchAllCoursesQuery, useFetchAvailableCoursesQuery, useFetchAllEnrolledCoursesQuery, useFetchCourseQuery, useFetchEnrolledCourseDataQuery, useUpdateCourseMutation } = courseApi