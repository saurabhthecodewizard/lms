import Notification from "@/redux/interfaces/notification.interface";
import { apiSlice } from "../apiSlice";

interface AllNotificationsResponse {
    success: boolean;
    notifications: Notification[];
}

export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllUnreadNotifications: builder.query<AllNotificationsResponse, void>({
            query: () => ({
                url: 'notifications',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        markNotificationAsRead: builder.mutation<void, string>({
            query: (notificationId) => ({
                url: `notifications/${notificationId}`,
                method: 'PUT',
                credentials: 'include' as const
            })
        }),
    })
})

export const { useLazyFetchAllUnreadNotificationsQuery, useMarkNotificationAsReadMutation } = notificationsApi;