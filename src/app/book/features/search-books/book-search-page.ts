import { Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { bookSearchEvents } from '../../state/book-search-store/book-search-events';
import { BooksSearchStore } from '../../state/book-search-store/book-search-store';
import { BooksGrid } from './books-grid';
import { SearchInput } from './search-input';

@Component({
  selector: 'ws-book-search-page',
  imports: [SearchInput, BooksGrid],
  providers: [BooksSearchStore],
  template: `
    <ws-search-input (update)="dispatchSearchQueryUpdate($event)" />
    <ws-books-grid [books]="books()" />
  `
})
export class BookSearchPage {
  // Container Component
  private readonly dispatcher = injectDispatch(bookSearchEvents);
  protected books = inject(BooksSearchStore).entities;

  protected dispatchSearchQueryUpdate(searchQuery: string) {
    this.dispatcher.searchQueryUpdated(searchQuery);
  }
}
