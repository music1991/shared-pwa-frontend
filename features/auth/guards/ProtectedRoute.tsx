import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../../../shared/constants/routes';

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}