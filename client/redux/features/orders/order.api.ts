import OrderBasic from "@/redux/interfaces/orders/orderBasic.interface";
import { apiSlice } from "../apiSlice";
import OrderInfo from "@/redux/interfaces/orders/orderInfo.interface";
import VerifyOrder from "@/redux/interfaces/orders/verifyOrder.interface";

interface AllOrdersResponse {
    success: boolean;
    orders: OrderBasic[];
}

interface CreateCourseResponse {
    success: boolean;
    order: OrderInfo;
}

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllOrders: builder.query<AllOrdersResponse, void>({
            query: () => ({
                url: 'orders/all',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        createOrder: builder.mutation<CreateCourseResponse, string>({
            query: (courseId) => ({
                url: `course/${courseId}/order`,
                method: 'POST',
                credentials: 'include' as const
            })
        }),
        freeCourse: builder.mutation<void, string>({
            query: (courseId) => ({
                url: `course/${courseId}/free`,
                method: 'POST',
                credentials: 'include' as const
            })
        }),
        validateOrder: builder.mutation<void, VerifyOrder>({
            query: (data) => ({
                url: `order/validate`,
                method: 'POST',
                body: data,
                credentials: 'include' as const
            })
        }),
    })
})

export const { useFetchAllOrdersQuery, useCreateOrderMutation, useValidateOrderMutation, useFreeCourseMutation } = ordersApi