import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { withRoute } from '@ngrx-traits/signals';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods } from '@ngrx/signals';
import { removeEntity, SelectEntityId, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { BookApiClient } from '../data/book-api-client';
import { Book } from '../data/models';

const selectId: SelectEntityId<Book> = book => book.isbn;

export function withBooks() {
  return signalStoreFeature(
    withEntities<Book>(),
    withRoute(({ params }) => ({ actualBookDetailISBN: params['isbn'] as string })),
    withComputed(store => ({
      currentBook: computed(() => store.entityMap()[store.actualBookDetailISBN()])
    })),
    withMethods((store, router = inject(Router), bookApiClient = inject(BookApiClient)) => ({
      loadBooks: rxMethod<void>(
        pipe(
          switchMap(() => {
            return bookApiClient.getAll().pipe(
              tapResponse({
                next: books => patchState(store, setEntities(books, { selectId })),
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
                  patchState(store, removeEntity(bookISBN));
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
