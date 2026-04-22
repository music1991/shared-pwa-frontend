import Card from '../../../shared/components/ui/Card';
import NotificationForm from '../components/NotificationForm';

export default function AdminNotificationsPage() {
  return (
    <div className="form-stack">
      <div>
        <h2 className="page-title">Enviar notificaciones</h2>
        <p className="page-subtitle">
          Como admin podés enviar a todos, a un usuario o a varios usuarios.
        </p>
      </div>

      <div className="grid-2">
        <Card>
          <h3 style={{ marginTop: 0 }}>Composer</h3>
          <p style={{ color: 'var(--muted)' }}>
            Armá el mensaje y elegí el destino.
          </p>
          <NotificationForm />
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Tips de prueba</h3>
          <ul style={{ color: 'var(--muted)', paddingLeft: 18 }}>
            <li>Primero logueate como user o employee en otro navegador.</li>
            <li>Activá las notificaciones desde su panel.</li>
            <li>Luego enviá el mensaje desde esta vista admin.</li>
            <li>El backend responderá successCount y failCount.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}