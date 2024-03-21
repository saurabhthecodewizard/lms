import { useLazyFetchAllUnreadNotificationsQuery, useMarkNotificationAsReadMutation } from '@/redux/features/notifications/notification.api';
import moment from 'moment';
import React from 'react'

interface NotificationItemProps {
    _id: string;
    title: string;
    createdAt: string;
    message: string;
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
    const { _id, title, message, createdAt } = props;
    const [markRead, markReadResult] = useMarkNotificationAsReadMutation();
    const [fetchNotifications] = useLazyFetchAllUnreadNotificationsQuery();

    const onMarkReadHandler = React.useCallback(() => {
        markRead(_id);
    }, [_id, markRead]);

    React.useEffect(() => {
        if (markReadResult.isSuccess && !markReadResult.isLoading) {
            fetchNotifications();
        }
    }, [markReadResult.isLoading, markReadResult.isSuccess, fetchNotifications]);

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-base font-bold px-2'>{title}</p>
                <p className='px-2 text-sm'>{moment(createdAt).fromNow()}</p>
            </div>
            <p className='text-sm px-2'>{message}</p>
            <button onClick={onMarkReadHandler} className='text-sm text-orange-500 cursor-pointer self-start ml-1 px-1 rounded-sm hover:bg-slate-300 hover:dark:bg-slate-700 hover:text-orange-700 hover:dark:text-orange-300'>Mark as read</button>
            <hr className="h-px w-full bg-orange-500 border-0 dark:bg-orange-500" />
        </div>
    )
}

export default NotificationItem;