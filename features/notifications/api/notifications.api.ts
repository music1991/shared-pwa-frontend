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
};