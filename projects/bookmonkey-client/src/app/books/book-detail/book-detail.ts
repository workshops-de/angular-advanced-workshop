import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './book-detail.html'
})
export class BookDetail {
  readonly book = input.required<Book>();
}
