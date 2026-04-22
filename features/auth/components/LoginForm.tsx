import { useState } from 'react';
import Input from '../../../shared/components/ui/Input';
import Button from '../../../shared/components/ui/Button';
import AlertMessage from '../../../shared/components/feedback/AlertMessage';

type Props = {
  onSubmit: (payload: { email: string; password: string }) => Promise<void>;
  loading: boolean;
};

export default function LoginForm({ onSubmit, loading }: Props) {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('hola123');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await onSubmit({ email, password });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'No se pudo iniciar sesión');
    }
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Iniciar sesión</h2>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>
          Entrá al panel según tu rol.
        </p>
      </div>

      {error ? <AlertMessage type="error" message={error} /> : null}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@test.com"
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>

      <div style={{ color: 'var(--muted)', fontSize: '.92rem' }}>
        Usuarios demo: admin, employee, user1, user2 — clave: <b>hola123</b>
      </div>
    </form>
  );
}