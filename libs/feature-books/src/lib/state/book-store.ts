import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Book } from '../book';
import { BooksClient } from '../books-client';

type BookStoreState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BookStoreState = {
  books: [],
  isLoading: false
};

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, booksClient = inject(BooksClient)) => ({
    loadBooks: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          booksClient.list().pipe(
            tapResponse({
              next: books => patchState(store, { books, isLoading: false }),
              error: () => patchState(store, { isLoading: false })
            })
          )
        )
      )
    )
  }))
);
