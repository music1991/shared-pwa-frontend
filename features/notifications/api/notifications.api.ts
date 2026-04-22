import api from '../../../shared/lib/axios';

export type SendNotificationPayload = {
  title: string;
  body: string;
  sendToAll?: boolean;
  targetUserId?: string;
  targetUserIds?: string[];
};

export const notificationsApi = {
  send: async (payload: SendNotificationPayload) => {
    const { data } = await api.post('/notifications/send', payload);
    return data;
  },

  getMine: async () => {
    const { data } = await api.get('/notifications/me');
    return data;
  },

  markAsRead: async (notificationId: string) => {
    const { data } = await api.patch(`/notifications/me/${notificationId}/read`);
    return data;
  },
};