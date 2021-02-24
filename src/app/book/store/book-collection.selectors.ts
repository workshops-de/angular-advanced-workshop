import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@store/router';
import { Book } from '../models';
import { bookFeature } from './book.feature';

const adapter = createEntityAdapter<Book>();

const bookCollectionSliceSelector = createSelector(bookFeature, feature => feature.bookCollection);

export const { selectAll: bookCollection } = adapter.getSelectors(bookCollectionSliceSelector);

export const bookByIsbn = createSelector(selectRouteParam('isbn'), bookCollection, (isbn, books) =>
  books.find(book => book.isbn === isbn)
);
