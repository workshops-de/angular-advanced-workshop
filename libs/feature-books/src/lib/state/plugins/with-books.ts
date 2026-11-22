import { computed, inject } from '@angular/core';
import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  type,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods
} from '@ngrx/signals';
import { entityConfig, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, switchMap, tap } from 'rxjs';
import { Book } from '../../book';
import { BooksClient } from '../../books-client';

type BooksState = {
  isLoading: boolean;
  selectedIsbn: string | null;
};

const initialState: BooksState = {
  isLoading: false,
  selectedIsbn: null
};

const bookConfig = entityConfig({
  entity: type<Book>(),
  collection: 'book',
  selectId: (book: Book) => book.isbn
});

export function withBooks() {
  return signalStoreFeature(
    withImmutableState(initialState),
    withEntities(bookConfig),
    withComputed(store => ({
      currentBook: computed(() => {
        const isbn = store.selectedIsbn();
        return isbn ? store.bookEntityMap()[isbn] : undefined;
      })
    })),
    withMethods((store, booksClient = inject(BooksClient)) => ({
      selectBook: (isbn: string | null) => patchState(store, { selectedIsbn: isbn }),
      loadBooks: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            booksClient.list().pipe(
              tapResponse({
                next: books =>
                  patchState(store, setAllEntities(books, bookConfig), { isLoading: false }),
                error: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      ),
      removeBook: rxMethod<string>(
        pipe(
          concatMap(isbn =>
            booksClient.delete(isbn).pipe(
              tapResponse({
                next: () => patchState(store, removeEntity(isbn, bookConfig)),
                error: () => undefined
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
