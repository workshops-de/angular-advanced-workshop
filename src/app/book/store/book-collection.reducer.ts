import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

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
