import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { signalStore } from '@ngrx/signals';
import { SelectEntityId, setEntities, withEntities } from '@ngrx/signals/entities';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { switchMap } from 'rxjs';
import { BookApiClient } from '../../data/book-api-client';
import { Book } from '../../data/models';
import { bookSearchEvents } from './book-search-events';

const selectId: SelectEntityId<Book> = book => book.isbn;

export const BooksSearchStore = signalStore(
  withEntities<Book>(),
  withDevtools('book search'),
  withEventHandlers((_, events = inject(Events), bookApiClient = inject(BookApiClient)) => [
    events.on(bookSearchEvents.searchQueryUpdated).pipe(
      switchMap(searchAction =>
        bookApiClient.findAll(searchAction.payload).pipe(
          mapResponse({
            next: books => bookSearchEvents.searchSucceeded(books),
            error: error => bookSearchEvents.searchFailed((error as Error).message)
          })
        )
      )
    )
  ]),
  withReducer(
    on(bookSearchEvents.searchSucceeded, action => setEntities(action.payload, { selectId })),
    on(bookSearchEvents.searchFailed, () => setEntities([] as Book[], { selectId }))
  )
);
