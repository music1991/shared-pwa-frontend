import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../../../shared/constants/routes';

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (payload: { email: string; password: string }) => {
    await login(payload);

    if (user?.role === 'admin') {
      navigate(ROUTES.ADMIN_NOTIFICATIONS);
      return;
    }

    navigate(ROUTES.APP);
  };

  return <LoginForm onSubmit={handleLogin} loading={isLoading} />;
}