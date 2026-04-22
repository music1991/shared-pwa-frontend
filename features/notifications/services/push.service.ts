import { pushApi } from '../api/push.api';
import { urlBase64ToUint8Array } from '../../../shared/utils/push';

export const pushService = {
  registerServiceWorker: async () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker no soportado');
    }

    return navigator.serviceWorker.register('/sw.js');
  },

  subscribe: async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      throw new Error('Permiso de notificaciones denegado');
    }

    const registration = await pushService.registerServiceWorker();
    const publicKeyResponse = await pushApi.getPublicKey();
    const vapidPublicKey = publicKeyResponse.data.publicKey;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
    });

    await pushApi.subscribe(subscription.toJSON());

    return subscription;
  },
};