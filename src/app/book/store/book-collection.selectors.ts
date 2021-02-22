import { createSelector } from '@ngrx/store';
import { bookFeature } from './book.feature';

const bookCollectionSliceSelector = createSelector(bookFeature, feature => feature.bookCollection);

export const bookCollection = createSelector(bookCollectionSliceSelector, slice => slice.entities);
