import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../../../shared/constants/routes';
import type { UserRole } from '../../../shared/constants/roles';

type Props = {
  children: ReactNode;
  allowedRoles: UserRole[];
};

export default function RoleGuard({ children, allowedRoles }: Props) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.USER_NOTIFICATIONS} replace />;
  }

  return <>{children}</>;
}