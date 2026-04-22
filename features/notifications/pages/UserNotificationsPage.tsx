import { useEffect, useState } from 'react';
import EnableNotificationsCard from '../components/EnableNotificationsCard';
import NotificationSection, {
  type NotificationItem,
} from '../components/NotificationSection';
import { notificationsService } from '../services/notifications.service';

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const result = await notificationsService.getMine();
        setNotifications(result);
      } catch (error) {
        console.error('Error loading notifications', error);
      }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PUSH_RECEIVED') {
        const payload = event.data.payload;

        if (payload?.title || payload?.body) {
          setNotifications((prev) => [
            {
              id: `live-${Date.now()}`,
              title: payload.title ?? 'Nueva notificación',
              body: payload.body ?? '',
              read: false,
              created_at: new Date().toISOString(),
              status: 'sent',
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