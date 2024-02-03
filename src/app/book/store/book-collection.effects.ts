import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { loadBooksComplete, loadBooksStart } from './book-collection.actions';

@Injectable()
export class BookCollectionEffects {
  private readonly actions$ = inject(Actions);
  private readonly bookApi = inject(BookApiService);

  load = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.bookApi.getAll()),
      map(books => loadBooksComplete({ books }))
    );
  });
}
