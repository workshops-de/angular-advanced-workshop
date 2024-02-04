import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@store/router';
import { Book } from '../models';
import { selectBookFeature } from './book.feature';

const adapter = createEntityAdapter<Book>();

const selectBookCollectionSlice = createSelector(selectBookFeature, feature => feature.bookCollection);

export const { selectAll: selectBookCollection } = adapter.getSelectors(selectBookCollectionSlice);

export const selectBookByIsbn = createSelector(selectRouteParam('isbn'), selectBookCollection, (isbn, books) =>
  books.find(book => book.isbn === isbn)
);
