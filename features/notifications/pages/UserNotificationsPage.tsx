import { useEffect, useState } from 'react';
import EnableNotificationsCard from '../components/EnableNotificationsCard';
import NotificationSection from '../components/NotificationSection';

type InAppNotification = {
  title: string;
  body: string;
};

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PUSH_RECEIVED') {
        setNotifications((prev) => [event.data.payload, ...prev]);
      }
    };

    navigator.serviceWorker?.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleMessage);
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