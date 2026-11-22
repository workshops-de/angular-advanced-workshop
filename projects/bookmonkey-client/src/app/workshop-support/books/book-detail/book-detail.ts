import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { Book } from '../book';

// Prepared presentational component - shows a single book. It only renders the
// book it is given; loading happens one level up in the page component.
@Component({
  selector: 'app-book-detail',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './book-detail.html'
})
export class BookDetail {
  readonly book = input.required<Book>();
}
