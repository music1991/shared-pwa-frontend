import api from '../../../shared/lib/axios';

export const pushApi = {
  getPublicKey: async () => {
    const { data } = await api.get('/push/public-key');
    return data;
  },

  subscribe: async (subscription: PushSubscriptionJSON) => {
    const { data } = await api.post('/push/subscribe', subscription);
    return data;
  },
};