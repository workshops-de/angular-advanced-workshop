import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
        {
          provide: BookApiService,
          useFactory: () => bookApiMock
        }
      ],
      declarations: [BookListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  describe('When books provided', () => {
    it('renders a list of books', () => {
      bookApiMock.getAll.and.returnValue(of([bookNa()]));

      fixture = TestBed.createComponent(BookListComponent);
      fixture.detectChanges();

      const bookCardFixtures = fixture.debugElement.queryAll(By.css('[data-test=book-list-card-item]'));

      expect(bookCardFixtures).toHaveSize(1);
    });
  });
});
