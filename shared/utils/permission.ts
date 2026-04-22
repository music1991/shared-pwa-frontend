export function getNotificationPermissionState(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }

  return Notification.permission;
}