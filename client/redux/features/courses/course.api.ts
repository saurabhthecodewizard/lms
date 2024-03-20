import CourseBasic from "@/redux/interfaces/courses/courseBasic.interface";
import { apiSlice } from "../apiSlice";
import CourseInfo from "@/redux/interfaces/courses/courseInfo.interface";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";
import EnrolledCourseData from "@/redux/interfaces/courses/enrolledCourseData.interface";
import CreateComment from "@/redux/interfaces/courses/comments/createComment.interface";
import CreateReply from "@/redux/interfaces/courses/comments/createReply.interface";
import CreateReview from "@/redux/interfaces/courses/comments/createReview.interface";
import CreateReviewReply from "@/redux/interfaces/courses/comments/createReviewReply.interface";

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
        addComment: builder.mutation<void, { courseId: string, comment: CreateComment }>({
            query: (data) => ({
                url: `course/${data.courseId}/comment`,
                method: 'PUT',
                body: data.comment,
                credentials: 'include' as const
            })
        }),
        addCommentReply: builder.mutation<void, { courseId: string, reply: CreateReply }>({
            query: (data) => ({
                url: `course/${data.courseId}/reply`,
                method: 'PUT',
                body: data.reply,
                credentials: 'include' as const
            })
        }),
        addReview: builder.mutation<void, { courseId: string, review: CreateReview }>({
            query: (data) => ({
                url: `course/${data.courseId}/review`,
                method: 'PUT',
                body: data.review,
                credentials: 'include' as const
            })
        }),
        addReviewReply: builder.mutation<void, { courseId: string, reviewId: string, reviewReply: CreateReviewReply }>({
            query: (data) => ({
                url: `course/${data.courseId}/review/${data.reviewId}`,
                method: 'PUT',
                body: data.reviewReply,
                credentials: 'include' as const
            })
        })
    })
})

export const {
    useCreateCourseMutation,
    useFetchAllCoursesQuery,
    useFetchAvailableCoursesQuery,
    useFetchAllEnrolledCoursesQuery,
    useFetchCourseQuery,
    useFetchEnrolledCourseDataQuery,
    useUpdateCourseMutation,
    useAddCommentMutation,
    useAddCommentReplyMutation,
    useAddReviewMutation,
    useAddReviewReplyMutation } = courseApi