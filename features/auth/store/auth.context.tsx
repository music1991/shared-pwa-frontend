import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { storage } from '../../../shared/utils/storage';
import { authService } from '../services/auth.service';
import type { UserRole } from '../../../shared/constants/roles';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(storage.getUser());
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      storage.clearAuth();
    }
  }, [token, user]);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);

    try {
      const result = await authService.login(payload);
      setToken(result.token);
      setUser(result.user);
      storage.setToken(result.token);
      storage.setUser(result.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.clearAuth();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
}