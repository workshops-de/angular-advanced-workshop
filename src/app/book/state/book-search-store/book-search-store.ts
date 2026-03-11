import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { failureOccurred } from '@common-components';
import { mapResponse } from '@ngrx/operators';
import { signalStore } from '@ngrx/signals';
import { removeAllEntities, SelectEntityId, setEntities, withEntities } from '@ngrx/signals/entities';
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
      switchMap(searchEvent =>
        bookApiClient.findAll(searchEvent.payload).pipe(
          mapResponse({
            next: books => {
              return isEmpty(books) ? bookSearchEvents.searchDidNotMatch() : bookSearchEvents.searchMatched(books);
            },
            error: error => failureOccurred({ reason: (error as Error).message })
          })
        )
      )
    )
  ]),
  withReducer(
    on(bookSearchEvents.searchMatched, event => setEntities(event.payload, { selectId })),
    on(bookSearchEvents.searchDidNotMatch, bookSearchEvents.searchFailed, () => removeAllEntities())
  )
);

function isEmpty(books: Book[]) {
  return !Array.isArray(books) ? false : books.length === 0;
}
