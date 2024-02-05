import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';
import { createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models';

const adapter = createEntityAdapter<Book>();

const selectBookCollectionSlice = createSelector(selectBookFeature, feature => feature.bookCollection);

export const { selectAll: selectBookCollection } = adapter.getSelectors(selectBookCollectionSlice);

export const selectBookByIsbn = (isbn: string) =>
  createSelector(selectBookCollection, books => books.find(book => book.isbn === isbn));
