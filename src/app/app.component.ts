import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainNavigationComponent } from '@common-components';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  imports: [MainNavigationComponent, RouterOutlet]
})
export class AppComponent {}
