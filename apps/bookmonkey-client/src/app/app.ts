import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '@workshop-support';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  warmWelcome = signal('Angularian');
  greet = signal('Hello');

  constructor() {
    setTimeout(() => {
      this.warmWelcome.update(warmWelcome => `${this.greet()} ${warmWelcome}`);
    }, 6000);
  }
}
