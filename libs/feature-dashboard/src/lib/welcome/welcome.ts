import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.html'
})
export class Welcome {
  attendeeName = signal('Angularian');
}
