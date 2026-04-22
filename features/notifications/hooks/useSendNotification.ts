import { useState } from 'react';
import {
  notificationsService,
} from '../services/notifications.service';
import type { SendNotificationPayload } from '../api/notifications.api';

export default function useSendNotification() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendNotification = async (payload: SendNotificationPayload) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await notificationsService.send(payload);
      setSuccessMessage(
        `Envío procesado. Success: ${result.successCount} | Fail: ${result.failCount}`
      );
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || 'No se pudo enviar');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    successMessage,
    errorMessage,
    sendNotification,
  };
}