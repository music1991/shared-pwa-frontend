import { useState } from 'react';
import Input from '../../../shared/components/ui/Input';
import Textarea from '../../../shared/components/ui/Textarea';
import Button from '../../../shared/components/ui/Button';
import AlertMessage from '../../../shared/components/feedback/AlertMessage';
import useSendNotification from '../hooks/useSendNotification';
import UserSelector from './UserSelector';

export default function NotificationForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mode, setMode] = useState<'all' | 'one' | 'many'>('all');
  const [targetUserId, setTargetUserId] = useState('');
  const [targetUserIds, setTargetUserIds] = useState<string[]>([]);

  const { loading, successMessage, errorMessage, sendNotification } =
    useSendNotification();

  const handleModeChange = (value: 'all' | 'one' | 'many') => {
    setMode(value);
    setTargetUserId('');
    setTargetUserIds([]);
  };

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
      if (!targetUserId) {
        return;
      }

      payload.targetUserId = targetUserId;
    }

    if (mode === 'many') {
      if (!targetUserIds.length) {
        return;
      }

      payload.targetUserIds = targetUserIds;
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
          onChange={(e) => handleModeChange(e.target.value as 'all' | 'one' | 'many')}
        >
          <option value="all">Todos</option>
          <option value="one">Un usuario</option>
          <option value="many">Varios usuarios</option>
        </select>
      </label>

      {mode === 'one' ? (
        <UserSelector
          mode="one"
          selectedUserId={targetUserId}
          selectedUserIds={[]}
          onSelectOne={setTargetUserId}
          onSelectMany={() => {}}
        />
      ) : null}

      {mode === 'many' ? (
        <UserSelector
          mode="many"
          selectedUserId=""
          selectedUserIds={targetUserIds}
          onSelectOne={() => {}}
          onSelectMany={setTargetUserIds}
        />
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar notificación'}
      </Button>
    </form>
  );
}