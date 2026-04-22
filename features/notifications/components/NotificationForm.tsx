import { useState } from 'react';
import Input from '../../../shared/components/ui/Input';
import Textarea from '../../../shared/components/ui/Textarea';
import Button from '../../../shared/components/ui/Button';
import AlertMessage from '../../../shared/components/feedback/AlertMessage';
import useSendNotification from '../hooks/useSendNotification';

export default function NotificationForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mode, setMode] = useState<'all' | 'one' | 'many'>('all');
  const [targetUserId, setTargetUserId] = useState('');
  const [targetUserIdsRaw, setTargetUserIdsRaw] = useState('');

  const { loading, successMessage, errorMessage, sendNotification } =
    useSendNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload: any = {
      title,
      body,
    };

    if (mode === 'all') {
      payload.sendToAll = true;
    }

    if (mode === 'one') {
      payload.targetUserId = targetUserId.trim();
    }

    if (mode === 'many') {
      payload.targetUserIds = targetUserIdsRaw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    await sendNotification(payload);
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      {successMessage ? (
        <AlertMessage type="success" message={successMessage} />
      ) : null}

      {errorMessage ? (
        <AlertMessage type="error" message={errorMessage} />
      ) : null}

      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Promo especial"
      />

      <Textarea
        label="Mensaje"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Solo para algunos usuarios"
      />

      <label className="field">
        <span className="label">Destino</span>
        <select
          className="select"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'all' | 'one' | 'many')}
        >
          <option value="all">Todos</option>
          <option value="one">Un usuario</option>
          <option value="many">Varios usuarios</option>
        </select>
      </label>

      {mode === 'one' ? (
        <Input
          label="UUID del usuario"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
          placeholder="33333333-3333-3333-3333-333333333333"
        />
      ) : null}

      {mode === 'many' ? (
        <Textarea
          label="UUIDs separados por coma"
          value={targetUserIdsRaw}
          onChange={(e) => setTargetUserIdsRaw(e.target.value)}
          placeholder="33333333-3333-3333-3333-333333333333, 44444444-4444-4444-4444-444444444444"
        />
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar notificación'}
      </Button>
    </form>
  );
}