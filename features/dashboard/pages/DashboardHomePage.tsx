import useAuth from '../../auth/hooks/useAuth';
import Card from '../../../shared/components/ui/Card';
import InstallAppCard from '../components/InstallAppCard';

export default function DashboardHomePage() {
  const { user } = useAuth();

  return (
    <div className="form-stack">
      <div>
        <h2 className="page-title">Hola, {user?.name}</h2>
        <p className="page-subtitle">
          Este es tu panel inicial. Desde acá podés navegar según tu rol.
        </p>
      </div>

      <div className="kpis">
        <div className="kpi">
          <span>Rol</span>
          <strong>{user?.role}</strong>
        </div>
        <div className="kpi">
          <span>Autenticación</span>
          <strong>JWT Activo</strong>
        </div>
        <div className="kpi">
          <span>Push</span>
          <strong>Listo para probar</strong>
        </div>
      </div>

      <InstallAppCard />

      <Card>
        <h3 style={{ marginTop: 0 }}>Estado del sistema</h3>
        <p style={{ color: 'var(--muted)' }}>
          El frontend está preparado para login, permisos por rol, suscripción
          push y envío de notificaciones contra tu backend actual.
        </p>
      </Card>
    </div>
  );
}