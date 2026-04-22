import { useState } from 'react';
import { pushService } from '../services/push.service';

export default function usePushSubscription() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const subscribe = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await pushService.subscribe();
      setSuccessMessage('Suscripción push realizada correctamente');
    } catch (error: any) {
      setErrorMessage(error?.message || 'No se pudo activar notificaciones');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    successMessage,
    errorMessage,
    subscribe,
  };
}