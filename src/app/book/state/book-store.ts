import { signalStore, withHooks } from '@ngrx/signals';
import { Book } from '../data/models';
import { withBooks } from './with-books';

export type BookState = { books: Book[]; actualBookDetailISBN: string | null };
export const initialState: BookState = { books: [], actualBookDetailISBN: null };

export const BookStore = signalStore(
  { providedIn: 'root' },
  withBooks(),
  withHooks(store => ({
    onInit: () => store.loadBooks()
  }))
);
