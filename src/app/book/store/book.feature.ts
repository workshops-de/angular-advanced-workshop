import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import { bookCollectionReducer } from './book-collection.reducer';

export const bookFeatureName = 'book';

export interface BookState {
  bookCollection: BookCollectionSlice;
}

export const bookReducers: ActionReducerMap<BookState> = {
  bookCollection: bookCollectionReducer
};

export const selectBookFeature = createFeatureSelector<BookState>(bookFeatureName);
