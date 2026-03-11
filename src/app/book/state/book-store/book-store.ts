import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withHooks } from '@ngrx/signals';
import { Book } from '../../data/models';
import { withBooks } from './with-books';

export type BookState = { books: Book[] };
export const initialState: BookState = { books: [] };

export const BookStore = signalStore(
  { providedIn: 'root' },
  withDevtools('book store'),
  withBooks(),
  withHooks(store => ({
    onInit: () => store.loadBooks()
  }))
);
