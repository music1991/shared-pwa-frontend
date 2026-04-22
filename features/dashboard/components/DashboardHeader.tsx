import useAuth from '../../auth/hooks/useAuth';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="dashboard-header">
      <div>
        <h1 style={{ margin: 0, fontSize: '1.35rem' }}>Panel principal</h1>
        <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
          Gestión de usuarios y notificaciones push
        </p>
      </div>

      <div className="top-user">
        <div className="top-user__avatar">
          {user?.name?.slice(0, 1).toUpperCase()}
        </div>
        <div className="top-user__meta">
          <p>{user?.name}</p>
          <small>{user?.role}</small>
        </div>
      </div>
    </header>
  );
}