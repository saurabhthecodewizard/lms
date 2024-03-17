import Analytic from "@/redux/interfaces/analytics/analytics.interface";
import { apiSlice } from "../apiSlice";

interface CourseAnalyticsResponse {
    success: boolean;
    courses: Analytic;
}

interface OrderAnalyticsResponse {
    success: boolean;
    orders: Analytic;
}

interface UserAnalyticsResponse {
    success: boolean;
    users: Analytic;
}

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCourseAnalytics: builder.query<CourseAnalyticsResponse, void>({
            query: () => ({
                url: 'analytics/courses',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        fetchUserAnalytics: builder.query<UserAnalyticsResponse, void>({
            query: () => ({
                url: 'analytics/users',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        fetchOrderAnalytics: builder.query<OrderAnalyticsResponse, void>({
            query: () => ({
                url: 'analytics/orders',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
    })
})

export const { useFetchCourseAnalyticsQuery, useFetchOrderAnalyticsQuery, useFetchUserAnalyticsQuery } = analyticsApi;