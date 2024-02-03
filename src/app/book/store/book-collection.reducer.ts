import { createReducer, on } from '@ngrx/store';
import { createBookComplete, loadBooksComplete } from './book-collection.actions';
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
  on(loadBooksComplete, (slice, { books }): BookCollectionSlice => ({ ...slice, entities: books }))
);
