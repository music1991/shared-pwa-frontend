import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import AlertMessage from '../../../shared/components/feedback/AlertMessage';
import usePushSubscription from '../hooks/usePushSubscription';
import { getNotificationPermissionState } from '../../../shared/utils/permission';

export default function EnableNotificationsCard() {
  const { subscribe, loading, successMessage, errorMessage } =
    usePushSubscription();

  const permission = getNotificationPermissionState();

  const permissionClass =
    permission === 'granted'
      ? 'permission-pill permission-granted'
      : permission === 'denied'
      ? 'permission-pill permission-denied'
      : 'permission-pill permission-default';

  return (
    <Card>
      <div className="form-stack">
        <div>
          <h3 style={{ marginTop: 0 }}>Activar notificaciones</h3>
          <p style={{ color: 'var(--muted)' }}>
            Permití notificaciones desde el navegador para recibir mensajes
            enviados por el admin.
          </p>
        </div>

        <div>
          <span className={permissionClass}>Permiso actual: {permission}</span>
        </div>

        {successMessage ? (
          <AlertMessage type="success" message={successMessage} />
        ) : null}

        {errorMessage ? (
          <AlertMessage type="error" message={errorMessage} />
        ) : null}

        <Button onClick={subscribe} disabled={loading}>
          {loading ? 'Activando...' : 'Activar notificaciones'}
        </Button>
      </div>
    </Card>
  );
}