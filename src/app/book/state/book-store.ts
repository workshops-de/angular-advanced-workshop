import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { BookApiClient } from '../data/book-api-client';
import { Book } from '../data/models';

export type BookState = { books: Book[]; actualBookDetailISBN: string | null };
export const initialState: BookState = { books: [], actualBookDetailISBN: null };

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(store => ({
    currentBook: computed(() => store.books().find(book => book.id === store.actualBookDetailISBN()))
  })),
  withMethods((store, router = inject(Router), bookApiClient = inject(BookApiClient)) => ({
    setBookDetailISBN: (isbn: string) => patchState(store, { actualBookDetailISBN: isbn }),
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
    ),
    removeBook: rxMethod<{ bookISBN: string }>(
      pipe(
        switchMap(({ bookISBN }) => {
          return bookApiClient.delete(bookISBN).pipe(
            tapResponse({
              next: () => {
                patchState(store, { books: store.books().filter(book => book.isbn !== bookISBN) });
                router.navigateByUrl('/');
              },
              error: error => console.error(error)
            })
          );
        })
      )
    )
  })),
  withHooks(store => ({
    onInit: () => store.loadBooks()
  }))
);
