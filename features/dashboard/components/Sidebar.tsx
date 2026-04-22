import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hooks/useAuth';
import { ROUTES } from '../../../shared/constants/routes';
import Button from '../../../shared/components/ui/Button';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__brand">
        <h2>Notify Center</h2>
        <p>Frontend PWA por features</p>
      </div>

      <nav className="sidebar__nav">
        <NavLink to={ROUTES.HOME} className="sidebar__link">
          Inicio
        </NavLink>

        {user?.role === 'admin' ? (
          <NavLink to={ROUTES.ADMIN_NOTIFICATIONS} className="sidebar__link">
            Enviar notificaciones
          </NavLink>
        ) : null}

        <NavLink to={ROUTES.USER_NOTIFICATIONS} className="sidebar__link">
          Mis notificaciones
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <div style={{ marginBottom: 14, color: 'var(--muted)', fontSize: '.92rem' }}>
          Logueado como <b>{user?.email}</b>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}