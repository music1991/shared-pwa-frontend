import { usersApi } from '../api/users.api';

export type UserListItem = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'user';
  created_at: string;
};

export const usersService = {
  getAll: async (): Promise<UserListItem[]> => {
    const response = await usersApi.getAll();
    return response.data;
  },
};