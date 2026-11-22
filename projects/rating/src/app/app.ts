import { Component, signal } from '@angular/core';
import { Rating } from './rating/rating';

@Component({
  imports: [Rating],
  selector: 'rating-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly value = signal(3);
}
