import NotificationModel from "../models/notification.model";


export const createNotification = (data: any) => NotificationModel.create(data);

export const getAllNotifications = () => NotificationModel.find().sort({ createdAt: -1 });