import { useLazyFetchAllUnreadNotificationsQuery } from '@/redux/features/notifications/notification.api';
import React from 'react';
import socketIO from 'socket.io-client';
import useProfile from './useProfile';

const SOCKET_SERVER_ENDPOINT = process.env.NEXT_PUBLIC_ABSOLUTE_SERVER_URL || '';
const socketId = socketIO(SOCKET_SERVER_ENDPOINT, { transports: ['websocket'] });

const useNotify = () => {
    const { isAdmin } = useProfile();
    const [fetchNotifications] = useLazyFetchAllUnreadNotificationsQuery();

    React.useEffect(() => {
        if (isAdmin) {
            socketId.on('connection', () => { console.log('New notification') });
        }
    }, [isAdmin]);

    React.useEffect(() => {
        if (isAdmin) {
            socketId.on('newNotification', (data) => {
                fetchNotifications();
            })
        }
    }, [fetchNotifications, isAdmin]);

    return React.useCallback(() => socketId.emit('notification', {}), []);
}

export default useNotify;