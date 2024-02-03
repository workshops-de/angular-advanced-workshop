import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';

const selectBookCollectionSlice = createSelector(selectBookFeature, feature => feature.bookCollection);

export const selectBookCollection = createSelector(selectBookCollectionSlice, slice => slice.entities);

export const selectBookByIsbn = (isbn: string) =>
  createSelector(selectBookCollection, books => books.find(book => book.isbn === isbn));
