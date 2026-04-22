import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="auth-hero__badge">PWA Notifications</div>
        <h1>Gestioná notificaciones en tiempo real</h1>
        <p>
          Login seguro con JWT, permisos por rol y panel listo para pruebas de
          push notifications.
        </p>
      </div>

      <div className="auth-card">{children}</div>
    </div>
  );
}