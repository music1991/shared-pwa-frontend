import api from '../../../shared/lib/axios';

export const usersApi = {
  getAll: async () => {
    const { data } = await api.get('/users');
    return data;
  },
};