import { signalStore, withState } from '@ngrx/signals';
import { Book } from '../data/models';

export type BookState = { books: Book[] };
export const initialState: BookState = { books: [] };

export const BookStore = signalStore(withState(initialState));
