import {
  notificationsApi,
  type SendNotificationPayload,
} from '../api/notifications.api';

export const notificationsService = {
  send: async (payload: SendNotificationPayload) => {
    const response = await notificationsApi.send(payload);
    return response.data;
  },
};