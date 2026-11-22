import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Book } from '../book';
import { BooksClient } from '../books-client';

type BookStoreState = {
  books: Book[];
  isLoading: boolean;
  selectedIsbn: string | null;
};

const initialState: BookStoreState = {
  books: [],
  isLoading: false,
  selectedIsbn: null
};

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
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
