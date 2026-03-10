import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { withRoute } from '@ngrx-traits/signals';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { BookApiClient } from '../data/book-api-client';
import { initialState } from './book-store';

export function withBooks() {
  return signalStoreFeature(
    withImmutableState(initialState),
    withRoute(({ params }) => ({ actualBookDetailISBN: params['isbn'] as string })),
    withComputed(store => ({
      currentBook: computed(() => store.books().find(book => book.id === store.actualBookDetailISBN()))
    })),
    withMethods((store, router = inject(Router), bookApiClient = inject(BookApiClient)) => ({
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
    }))
  );
}
