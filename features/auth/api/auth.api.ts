import api from '../../../shared/lib/axios';

type LoginPayload = {
  email: string;
  password: string;
};

export const authApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },

  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};