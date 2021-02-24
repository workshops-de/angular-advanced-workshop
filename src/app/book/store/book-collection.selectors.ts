import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@store/router';
import { bookFeature } from './book.feature';

const bookCollectionSliceSelector = createSelector(bookFeature, feature => feature.bookCollection);

export const bookCollection = createSelector(bookCollectionSliceSelector, slice => slice.entities);

export const bookByIsbn = createSelector(selectRouteParam('isbn'), bookCollection, (isbn, books) =>
  books.find(book => book.isbn === isbn)
);
