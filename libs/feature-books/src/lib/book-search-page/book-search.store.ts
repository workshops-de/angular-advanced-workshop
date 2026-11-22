import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { switchMap } from 'rxjs';
import { Book } from '../book';
import { BooksClient } from '../books-client';
import { bookSearchEvents } from './book-search.events';

type BookSearchState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BookSearchState = {
  books: [],
  isLoading: false
};

export const BookSearchStore = signalStore(
  withState(initialState),
  withReducer(
    on(bookSearchEvents.searchQueryUpdated, () => ({ isLoading: true })),
    on(bookSearchEvents.searchSucceeded, ({ payload: books }) => ({ books, isLoading: false })),
    on(bookSearchEvents.searchFailed, () => ({ isLoading: false }))
  ),
  withEventHandlers((_store, events = inject(Events), booksClient = inject(BooksClient)) => ({
    search$: events.on(bookSearchEvents.searchQueryUpdated).pipe(
      switchMap(({ payload }) =>
        booksClient.search(payload.query).pipe(
          mapResponse({
            next: books => bookSearchEvents.searchSucceeded(books),
            error: (error: Error) => {
              console.error(error);
              return bookSearchEvents.searchFailed(error.message);
            }
          })
        )
      )
    )
  }))
);
