import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Book, bookNa } from '../models';
import { BookListComponent } from './book-list.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { Component, Input } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectBookCollection } from '@store/book';

describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let store: MockStore;

  @Component({
    selector: 'ws-book-card',
    standalone: true,
    template: ''
  })
  class BookCardMockComponent {
    @Input() content: Book | undefined;
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

  describe('When books provided', () => {
    it('renders a list of books', () => {
      const books = [bookNa(), bookNa()];
      store.overrideSelector(selectBookCollection, books);

      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      const bookCardDebugElements = fixture.debugElement.queryAll(By.css('ws-book-card'));

      expect(bookCardDebugElements).toHaveSize(books.length);
      expect((bookCardDebugElements[0].componentInstance as BookCardComponent).content).toEqual(books[0]);
      expect((bookCardDebugElements[1].componentInstance as BookCardComponent).content).toEqual(books[1]);
    });
  });
});
