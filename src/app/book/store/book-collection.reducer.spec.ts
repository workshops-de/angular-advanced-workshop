import { EntityState } from '@ngrx/entity';
import { Book, bookNa } from '../models';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';
import { bookCollectionReducer } from './book-collection.reducer';

describe('BookCollection: reducer', () => {
  describe('When a book is created', () => {
    it('adds the book to the store', () => {
      const isbn = '123-456-789';
      const book: Book = { ...bookNa(), isbn };

      const initialState: EntityState<Book> = { entities: {}, ids: [] };

      const action = createBookComplete({ book });
      const state = bookCollectionReducer(initialState, action);

      expect(state.entities[isbn]).toEqual(book);
      expect(state.ids).toContain(isbn);
    });
  });

  describe('When a book is updated', () => {
    it('update the book in the store', () => {
      const isbn = '123-456-789';
      const book: Book = { ...bookNa(), isbn };

      const initialState: EntityState<Book> = {
        entities: {
          [isbn]: book
        },
        ids: [isbn]
      };

      const updatedBook = { ...book, title: 'Moby Dick' };

      const action = updateBookComplete({ update: updatedBook });
      const state = bookCollectionReducer(initialState, action);

      expect(state.entities[isbn]).toEqual(updatedBook);
      expect(state.ids).toContain(isbn);
    });
  });

  describe('When a book is deleted', () => {
    it('removes the book from the store', () => {
      const isbn = '123-456-789';

      const initialState: EntityState<Book> = { entities: {}, ids: [] };

      const action = deleteBookComplete({ bookIsbn: isbn });
      const state = bookCollectionReducer(initialState, action);

      expect(state.entities[isbn]).toBeUndefined();
      expect(state.ids).not.toContain(isbn);
    });
  });

  describe('When books are loaded', () => {
    it('adds the books to the store', () => {
      const isbn1 = '123-456-789';
      const book1: Book = { ...bookNa(), isbn: isbn1 };
      const isbn2 = '987-654-321';
      const book2: Book = { ...bookNa(), isbn: isbn2 };
      const books = [book1, book2];

      const initialState: EntityState<Book> = { entities: {}, ids: [] };

      const action = loadBooksComplete({ books });
      const state = bookCollectionReducer(initialState, action);

      expect(state.entities[isbn1]).toEqual(book1);
      expect(state.entities[isbn2]).toEqual(book2);
      expect(state.ids).toEqual([isbn1, isbn2]);
    });
  });
});
