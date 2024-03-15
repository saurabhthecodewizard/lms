import OrderBasic from "@/redux/interfaces/orders/orderBasic.interface";
import { apiSlice } from "../apiSlice";

interface AllOrdersResponse {
    success: boolean;
    orders: OrderBasic[];
}

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllOrders: builder.query<AllOrdersResponse, void>({
            query: () => ({
                url: 'orders/all',
                method: 'GET',
                credentials: 'include' as const
            })
        })
    })
})

export const { useFetchAllOrdersQuery } = ordersApi