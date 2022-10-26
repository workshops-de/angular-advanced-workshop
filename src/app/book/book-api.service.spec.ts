import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { BookApiService } from './book-api.service';
import { mochBookNa } from './models';

const mockData = [mochBookNa];

describe('BookApiService', () => {
  let service: BookApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookApiService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getAll() provides a list of Books if everything works', done => {
    service.getAll().subscribe(data => {
      expect(data).toBe(mockData);
      done();
    });
    const req = httpMock.expectOne('http://localhost:4730/books');
    // expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('getAll() provides the error "Sorry, we have connectivity issues" if the Network-Connection is lost', async () => {
    let books$ = lastValueFrom(service.getAll());

    httpMock.expectOne('http://localhost:4730/books').error(new ProgressEvent('Network Error'));

    await expectAsync(books$).toBeRejectedWithError('Sorry, we have connectivity issues');
  });
  it('getAll() provides the error "Sorry, we could not load any books" if the API responds with error code 500.', done => {
    service.getAll().subscribe({
      error: data => {
        expect(data).toEqual(new Error('Sorry, we could not load any books'));
        done();
      }
    });
    httpMock.expectOne('http://localhost:4730/books').flush('Meeeeh', { status: 500, statusText: 'API doof' });
  });
});
