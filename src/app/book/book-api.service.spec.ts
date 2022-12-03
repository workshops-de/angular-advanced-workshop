import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { firstValueFrom, of } from 'rxjs';
import { BookApiService } from './book-api.service';
import { Book, bookNa } from './models';

describe('BookApiService', () => {
  let service: BookApiService;
  let backend: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(BookApiService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getAll', () => {
    it('provides a list of Books', done => {
      const bookList = [bookNa()];
      service.getAll().subscribe((books: Book[]) => {
        expect(books).toBe(bookList);
        done();
      });
      backend.expectOne('http://localhost:4730/books').flush(bookList);
    });

    it('provides the error Sorry, we could not load any books if the API responds with error code 500', done => {
      service.getAll().subscribe({
        error: err => {
          expect(err.message).toBe('Sorry, we could not load any books');
          done();
        }
      });
      backend
        .expectOne('http://localhost:4730/books')
        .flush('', { status: 500, statusText: 'Sorry, we could not load any books' });
    });
    it('provides the error Sorry, we have connectivity issues if the Network-Connection is lost', done => {
      service.getAll().subscribe({
        error: err => {
          expect(err.message).toBe('Sorry, we have connectivity issues');
          done();
        }
      });
      backend.expectOne('http://localhost:4730/books').error(new ProgressEvent('error'));
    });
  });
});

describe('Spectator BookApiService', () => {
  let spectator: SpectatorHttp<BookApiService>;
  const createHttp = createHttpFactory(BookApiService);
  let service: BookApiService;

  beforeEach(async () => {
    spectator = createHttp();
    service = spectator.service;
  });

  describe('getAll', () => {
    it('provides a list of Books', async () => {
      const bookList = [bookNa()];
      const books$ = firstValueFrom(service.getAll());

      spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).flush(bookList);
      await expectAsync(books$).toBeResolvedTo(bookList);
    });

    it('provides the error Sorry, we could not load any books if the API responds with error code 500', async () => {
      const books$ = firstValueFrom(service.getAll());
      spectator
        .expectOne('http://localhost:4730/books', HttpMethod.GET)
        .flush('', { status: 500, statusText: 'Sorry, we could not load any books' });
      await expectAsync(books$).toBeRejectedWithError('Sorry, we could not load any books');
    });

    it('provides the error Sorry, we have connectivity issues if the Network-Connection is lost', async () => {
      const books$ = firstValueFrom(service.getAll());
      spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).error(new ProgressEvent('Network Error'));
      await expectAsync(books$).toBeRejectedWithError('Sorry, we have connectivity issues');
    });
  });
});
