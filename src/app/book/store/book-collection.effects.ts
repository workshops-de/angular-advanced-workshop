import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { createBookComplete, createBookStart, loadBooksComplete, loadBooksStart } from './book-collection.actions';

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

  navigateToStart = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createBookComplete),
        switchMap(() => this.router.navigateByUrl('/'))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly bookApi: BookApiService,
    private readonly router: Router
  ) {}
}
