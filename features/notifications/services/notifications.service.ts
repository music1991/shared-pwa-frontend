import {
  notificationsApi,
  type SendNotificationPayload,
} from '../api/notifications.api';

export const notificationsService = {
  send: async (payload: SendNotificationPayload) => {
    const response = await notificationsApi.send(payload);
    return response.data;
  },

  getMine: async () => {
    const response = await notificationsApi.getMine();
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    const response = await notificationsApi.markAsRead(notificationId);
    return response.data;
  },
};