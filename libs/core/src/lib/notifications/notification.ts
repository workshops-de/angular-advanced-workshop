export type NotificationKind = 'error' | 'success' | 'info';

export interface Notification {
  id: number;
  kind: NotificationKind;
  message: string;
}
