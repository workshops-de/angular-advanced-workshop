import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectDispatch } from '@ngrx/signals/events';

import { BookCard } from '../book-card/book-card';
import { BookMarkerStore } from '../book-marker-store';
import { bookSearchEvents } from './book-search.events';
import { BookSearchStore } from './book-search.store';

@Component({
  selector: 'app-book-search-page',
  imports: [BookCard, RouterLink],
  providers: [BookSearchStore, BookMarkerStore],
  templateUrl: './book-search-page.html'
})
export class BookSearchPage {
  protected readonly store = inject(BookSearchStore);
  private readonly dispatch = injectDispatch(bookSearchEvents);

  protected search(query: string) {
    this.dispatch.searchQueryUpdated({ query });
  }
}
