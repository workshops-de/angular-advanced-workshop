import { computed, inject } from '@angular/core';
import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Book } from '../../book';
import { BooksClient } from '../../books-client';

type BooksState = {
  books: Book[];
  isLoading: boolean;
  selectedIsbn: string | null;
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
  selectedIsbn: null
};

export function withBooks() {
  return signalStoreFeature(
    withImmutableState(initialState),
    withComputed(store => ({
      currentBook: computed(() => store.books().find(book => book.isbn === store.selectedIsbn()))
    })),
    withMethods((store, booksClient = inject(BooksClient)) => ({
      selectBook: (isbn: string | null) => patchState(store, { selectedIsbn: isbn }),
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
    })),
    withHooks({
      onInit(store) {
        store.loadBooks();
      }
    })
  );
}
