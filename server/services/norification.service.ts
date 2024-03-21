import NotificationModel, { Notification } from "../models/notification.model";


export const createNotification = (data: any) => NotificationModel.create(data);

export const getAllNotifications = () => NotificationModel.find({ status: 'unread' }).sort({ createdAt: -1 });

export const getNotificationById = (notificationId: string) => NotificationModel.findById(notificationId);

export const saveNotification = (notification: Notification) => notification.save();

export const deleteReadNotificationOlderThanThirtyDays = async () => {
    const dateNow = Date.now();
    const beforeThirtyDays = new Date(dateNow - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({
        status: "read",
        createdAt: {
            $lt: beforeThirtyDays
        }
    });
    console.log(`Read notifications clean up: ${dateNow}`);
}