import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BookDetail } from '../book-detail/book-detail';
import { BookStore } from '../state/book-store';

@Component({
  selector: 'app-book-detail-page',
  imports: [RouterLink, BookDetail],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  private readonly store = inject(BookStore);

  readonly isbn = input('');

  protected readonly book = this.store.currentBook;
  protected readonly isLoading = this.store.isLoading;

  constructor() {
    effect(() => this.store.selectBook(this.isbn()));
  }
}
