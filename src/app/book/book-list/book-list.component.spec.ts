import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadBooksStart, selectBookCollection } from '@store/book';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book, bookNa } from '../models';
import { BookListComponent } from './book-list.component';

describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let store: MockStore;

  @Component({
    selector: 'ws-book-card',
    template: ''
  })
  class BookCardMockComponent {
    content = input<Book>();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [BookListComponent]
    }).overrideComponent(BookListComponent, {
      remove: { imports: [BookCardComponent] },
      add: { imports: [BookCardMockComponent] }
    });

    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    /**
     *
     * Important!
     *
     * If you forget to reset the selectors, that will impact other tests.
     * This is hard to debug, because the selectors are not reset automatically.
     *
     */
    store?.resetSelectors();
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      const books = [bookNa(), bookNa()];

      store.overrideSelector(selectBookCollection, books);

      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      store.dispatch(loadBooksStart());
      fixture.detectChanges();

      const bookCardDebugElements = fixture.debugElement.queryAll(By.css('ws-book-card'));

      expect(bookCardDebugElements).toHaveSize(books.length);

      const book_1 = bookCardDebugElements[0].componentInstance.content();
      const book_2 = bookCardDebugElements[1].componentInstance.content();

      expect(book_1).toEqual(books[0]);
      expect(book_2).toEqual(books[1]);
    });
  });
});
