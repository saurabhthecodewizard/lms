import NotificationModel, { Notification } from "../models/notification.model";


export const createNotification = (data: any) => NotificationModel.create(data);

export const getAllNotifications = () => NotificationModel.find().sort({ createdAt: -1 });

export const getNotificationById = (notificationId: string) => NotificationModel.findById(notificationId);

export const saveNotification = (notification: Notification) => notification.save();