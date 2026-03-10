import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { BookApiClient } from '../data/book-api-client';
import { Book } from '../data/models';

export type BookState = { books: Book[] };
export const initialState: BookState = { books: [] };

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, bookApiClient = inject(BookApiClient)) => ({
    loadBooks: rxMethod<void>(
      pipe(
        switchMap(() => {
          return bookApiClient.getAll().pipe(
            tapResponse({
              next: books => patchState(store, { books }),
              error: error => console.error(error)
            })
          );
        })
      )
    )
  }))
);
