import { NavLink } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';
import { ROUTES } from '../../../shared/constants/routes';

export default function BottomNav() {
  const { user } = useAuth();

  return (
    <nav className="bottom-nav">
      <NavLink to={ROUTES.HOME}>Inicio</NavLink>
      {user?.role === 'admin' ? (
        <NavLink to={ROUTES.ADMIN_NOTIFICATIONS}>Enviar</NavLink>
      ) : (
        <NavLink to={ROUTES.USER_NOTIFICATIONS}>Panel</NavLink>
      )}
      <NavLink to={ROUTES.USER_NOTIFICATIONS}>Notifs</NavLink>
    </nav>
  );
}