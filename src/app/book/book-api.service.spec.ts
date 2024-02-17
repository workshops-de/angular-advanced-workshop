import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { BookApiService } from './book-api.service';
import { bookNa } from './models';
import { provideHttpClient } from '@angular/common/http';

describe('☁️ BookApi', () => {
  let httpMock: HttpTestingController;
  let bookApi: BookApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), BookApiService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    bookApi = TestBed.inject(BookApiService);
  });

  afterEach(() => httpMock.verify());

  describe('When the API responds with books', () => {
    it('provides books', async () => {
      const books = [bookNa()];
      const books$ = firstValueFrom(bookApi.getAll());

      httpMock.expectOne('http://localhost:4730/books').flush(books);

      await expectAsync(books$).toBeResolvedTo(books);
    });
  });

  describe('When there is an Network error', () => {
    it('claims connectivity issues', async () => {
      const books$ = firstValueFrom(bookApi.getAll());

      httpMock.expectOne('http://localhost:4730/books').error(new ProgressEvent('Network error.'));

      await expectAsync(books$).toBeRejectedWithError('Sorry, we have connectivity issues.');
    });
  });

  describe('When the API responds with an error', () => {
    it('claims API issues', async () => {
      const books$ = firstValueFrom(bookApi.getAll());

      httpMock
        .expectOne('http://localhost:4730/books')
        .flush('No books', { status: 500, statusText: 'The API hung up' });

      await expectAsync(books$).toBeRejectedWithError('Sorry, we could not load any books');
    });
  });
});
