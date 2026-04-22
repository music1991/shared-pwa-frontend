type NotificationItem = {
  title: string;
  body: string;
};

type Props = {
  notifications: NotificationItem[];
};

export default function NotificationSection({ notifications }: Props) {
  return (
    <section className="card panel">
      <div className="form-stack">
        <div>
          <h3 style={{ marginTop: 0 }}>Sección de notificaciones</h3>
          <p style={{ color: 'var(--muted)' }}>
            Notificaciones recibidas mientras la app está abierta.
          </p>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="notification-card">
              <h4>Sin notificaciones aún</h4>
              <p>Cuando llegue una push, también la vas a ver acá.</p>
            </div>
          ) : (
            notifications.map((item, index) => (
              <div key={`${item.title}-${index}`} className="notification-card">
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}