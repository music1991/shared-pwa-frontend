import { useEffect, useState } from 'react';
import EnableNotificationsCard from '../components/EnableNotificationsCard';
import NotificationSection, {
  type NotificationItem,
} from '../components/NotificationSection';

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PUSH_RECEIVED') {
        const payload = event.data.payload;

        if (payload?.title || payload?.body) {
          setNotifications((prev) => [
            {
              title: payload.title ?? 'Nueva notificación',
              body: payload.body ?? '',
            },
            ...prev,
          ]);
        }
      }
    };

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', handleMessage);
    }

    return () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      }
    };
  }, []);

  return (
    <div className="form-stack">
      <div>
        <h2 className="page-title">Mis notificaciones</h2>
        <p className="page-subtitle">
          Activá permisos push y prepará tu navegador para recibir avisos.
        </p>
      </div>

      <div className="grid-2">
        <EnableNotificationsCard />
        <NotificationSection notifications={notifications} />
      </div>
    </div>
  );
}