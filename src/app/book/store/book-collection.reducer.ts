import { createReducer, on } from '@ngrx/store';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initial: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initial,
  on(
    createBookComplete,
    (slice, { book }): BookCollectionSlice => ({
      ...slice,
      entities: [...slice.entities, book]
    })
  ),
  on(
    deleteBookComplete,
    (slice, { bookIsbn }): BookCollectionSlice => ({
      ...slice,
      entities: slice.entities.filter(book => book.isbn !== bookIsbn)
    })
  ),
  on(loadBooksComplete, (slice, { books }): BookCollectionSlice => ({ ...slice, entities: books })),
  on(
    updateBookComplete,
    (slice, { update }): BookCollectionSlice => ({
      ...slice,
      entities: slice.entities.map(book => (book.isbn === update.isbn ? update : book))
    })
  )
);
