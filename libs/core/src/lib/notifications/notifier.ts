import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { type ComponentRef, Service, inject, signal } from '@angular/core';

import { NotificationHost } from './notification-host/notification-host';

export type NotificationKind = 'error' | 'success' | 'info';

export interface Notification {
  id: number;
  kind: NotificationKind;
  message: string;
}

const AUTO_DISMISS_MS = 4000;

/**
 * Inject this service to show toast notifications from anywhere in the app.
 * The notification host is created lazily via CDK Overlay/Portal on first
 * use - no template markup needs to be added anywhere.
 */
@Service()
export class Notifier {
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | undefined;
  private hostRef: ComponentRef<NotificationHost> | undefined;
  private nextId = 0;
  private timeouts = new Map<number, ReturnType<typeof setTimeout>>();

  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  error(message: string): void {
    this.show(message, 'error');
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  dismiss(id: number): void {
    clearTimeout(this.timeouts.get(id));
    this.timeouts.delete(id);
    this._notifications.update(notifications =>
      notifications.filter(notification => notification.id !== id)
    );
    this.hostRef?.changeDetectorRef.detectChanges();
  }

  private show(message: string, kind: NotificationKind): void {
    this.ensureHost();
    const id = this.nextId++;
    this._notifications.update(notifications => [...notifications, { id, kind, message }]);
    this.hostRef?.changeDetectorRef.detectChanges();

    this.timeouts.set(
      id,
      setTimeout(() => this.dismiss(id), AUTO_DISMISS_MS)
    );
  }

  private ensureHost(): void {
    if (this.overlayRef) {
      return;
    }
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().bottom('16px').right('16px'),
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    /*
     * NotificationHost is created imperatively via the overlay - it's never
     * part of the app's own template tree - so its signal reads never get
     * picked up by zoneless change detection on their own. We have to
     * trigger a check on it explicitly whenever `_notifications` changes.
     */
    this.hostRef = this.overlayRef.attach(new ComponentPortal(NotificationHost));
  }
}
