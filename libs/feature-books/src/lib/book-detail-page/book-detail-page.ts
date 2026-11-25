import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BookDetail } from '../book-detail/book-detail';
import { RemoteRating } from '../remote-rating/remote-rating';
import { BookStore } from '../state/book-store';

@Component({
  selector: 'app-book-detail-page',
  imports: [RouterLink, BookDetail, RemoteRating],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  private readonly store = inject(BookStore);

  readonly isbn = input('');

  /** Only kept locally for now: the rating is not persisted. */
  protected readonly rating = signal(0);

  protected readonly book = this.store.currentBook;
  protected readonly isLoading = this.store.isLoading;

  constructor() {
    effect(() => this.store.selectBook(this.isbn()));
  }
}
