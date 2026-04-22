import { authApi } from '../api/auth.api';
import type { AuthUser } from '../store/auth.context';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: AuthUser;
};

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await authApi.login(payload);
    return response.data;
  },
};