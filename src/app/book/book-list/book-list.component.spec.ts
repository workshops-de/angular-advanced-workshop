import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { BookListComponent } from './book-list.component';

describe('<ws-book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let bookApiMock: jasmine.SpyObj<BookApiService>;

  beforeEach(() => {
    bookApiMock = jasmine.createSpyObj<BookApiService>(['getAll']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: BookApiService,
          useValue: bookApiMock
        }
      ],
      imports: [BookListComponent]
    });
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      const books = [bookNa(), bookNa()];
      bookApiMock.getAll.and.returnValue(of(books));

      fixture = TestBed.createComponent(BookListComponent);
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
