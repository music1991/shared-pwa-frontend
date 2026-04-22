import { Navigate, useRoutes } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import DashboardHomePage from '../../features/dashboard/pages/DashboardHomePage';
import AdminNotificationsPage from '../../features/notifications/pages/AdminNotificationsPage';
import UserNotificationsPage from '../../features/notifications/pages/UserNotificationsPage';
import UserPanelPage from '../../features/panel/pages/UsePanelPage';
import ProtectedRoute from '../../features/auth/guards/ProtectedRoute';
import RoleGuard from '../../features/auth/guards/RoleGuard';

function RouterView() {
  return useRoutes([
    {
      path: ROUTES.LOGIN,
      element: (
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      ),
    },
    {
      path: ROUTES.APP,
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardHomePage />,
        },
        {
          path: 'admin/notifications',
          element: (
            <RoleGuard allowedRoles={['admin']}>
              <AdminNotificationsPage />
            </RoleGuard>
          ),
        },
        {
          path: 'notifications',
          element: <UserNotificationsPage />,
        },
        {
          path: 'panel',
          element: <UserPanelPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
  ]);
}

export default function AppRouter() {
  return <RouterView />;
}