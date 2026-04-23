self.addEventListener('push', (event) => {
  let data = {
    title: 'Nueva notificación',
    body: 'Tenés un nuevo mensaje',
  };

  try {
    if (event.data) {
      const rawText = event.data.text();

      try {
        const parsed = JSON.parse(rawText);
        data = {
          title: parsed.title || data.title,
          body: parsed.body || data.body,
          ...parsed,
        };
      } catch {
        data = {
          ...data,
          body: rawText,
        };
      }
    }
  } catch (error) {
    console.error('[SW] error procesando payload', error);
  }

  event.waitUntil(
    (async () => {
      const windowClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        client.postMessage({
          type: 'PUSH_RECEIVED',
          payload: data,
        });
      }

      await self.registration.showNotification(data.title, {
        body: data.body,
        icon: '',
        badge: '',
        requireInteraction: true,
        data,
      });
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow('/app/notifications'));
});