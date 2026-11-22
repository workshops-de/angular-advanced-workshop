import { Component, inject } from '@angular/core';

import { Notifier } from '../notifier';

@Component({
  selector: 'app-notification-host',
  templateUrl: './notification-host.html'
})
export class NotificationHost {
  protected notifier = inject(Notifier);
}
