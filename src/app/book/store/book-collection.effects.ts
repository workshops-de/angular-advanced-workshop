import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import {
  createBookComplete,
  createBookStart,
  deleteBookComplete,
  deleteBookStart,
  loadBooksComplete,
  loadBooksStart,
  updateBookComplete,
  updateBookStart
} from './book-collection.actions';
import { selectRouteParam } from '@store/router';
import { Store } from '@ngrx/store';

@Injectable()
export class BookCollectionEffects {
  load = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.bookApi.getAll()),
      map(books => loadBooksComplete({ books }))
    );
  });

  create = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBookStart),
      concatMap(({ book }) => this.bookApi.create(book)),
      map(bookCreated => createBookComplete({ book: bookCreated }))
    );
  });

  delete = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBookStart),
      concatLatestFrom(() => this.store.select(selectRouteParam('isbn'))),
      exhaustMap(([, isbn]) => {
        const bookIsbn = isbn!;
        return this.bookApi.delete(bookIsbn).pipe(map(() => deleteBookComplete({ bookIsbn })));
      })
    );
  });

  update = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBookStart),
      exhaustMap(({ patch }) =>
        this.bookApi.update(patch.isbn, patch).pipe(map(update => updateBookComplete({ update })))
      )
    );
  });

  navigateToStart = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createBookComplete, deleteBookComplete, updateBookComplete),
        switchMap(() => this.router.navigateByUrl('/'))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly bookApi: BookApiService,
    private readonly router: Router,
    private readonly store: Store
  ) {}
}
