import { createReducer, on } from '@ngrx/store';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';
import { createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models';

const adapter = createEntityAdapter<Book>({ selectId: model => model.isbn });

export const bookCollectionReducer = createReducer(
  adapter.getInitialState(),

  on(createBookComplete, (slice, { book }): BookCollectionSlice => adapter.addOne(book, slice)),

  on(deleteBookComplete, (slice, { bookIsbn }): BookCollectionSlice => adapter.removeOne(bookIsbn, slice)),

  on(loadBooksComplete, (slice, { books }): BookCollectionSlice => adapter.setAll(books, slice)),

  on(
    updateBookComplete,
    (slice, { update }): BookCollectionSlice => adapter.updateOne({ id: update.isbn, changes: update }, slice)
  )
);
