import { Component, input, output } from '@angular/core';

import { Notification } from '../notification';

@Component({
  selector: 'app-notification-host',
  templateUrl: './notification-host.html'
})
export class NotificationHost {
  readonly notifications = input.required<Notification[]>();
  readonly dismissed = output<number>();
}
