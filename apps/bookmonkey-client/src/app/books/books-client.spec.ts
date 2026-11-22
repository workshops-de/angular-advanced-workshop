import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BooksClient } from './books-client';
import { Book } from './book';

describe('BooksClient', () => {
  let booksClient: BooksClient;
  let httpMock: HttpTestingController;

  const mobyDick: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    booksClient = TestBed.inject(BooksClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads the first 15 books via GET', async () => {
    const booksResource = TestBed.runInInjectionContext(() => booksClient.getAll());
    TestBed.tick();

    const req = httpMock.expectOne(r => r.url === 'http://localhost:4730/books');
    expect(req.request.params.get('_start')).toBe('0');
    expect(req.request.params.get('_end')).toBe('15');
    req.flush([mobyDick]);

    await vi.waitFor(() => expect(booksResource.value()).toEqual([mobyDick]));
  });

  it('creates a book via POST', () => {
    let created: Book | undefined;
    booksClient.create(mobyDick).subscribe(book => (created = book));

    const req = httpMock.expectOne('http://localhost:4730/books');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mobyDick);
    req.flush(mobyDick);

    expect(created).toEqual(mobyDick);
  });

  it('updates a book via PUT', () => {
    let updated: Book | undefined;
    booksClient.update(mobyDick.isbn, mobyDick).subscribe(book => (updated = book));

    const req = httpMock.expectOne(`http://localhost:4730/books/${mobyDick.isbn}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mobyDick);
    req.flush(mobyDick);

    expect(updated).toEqual(mobyDick);
  });

  it('deletes a book via DELETE', () => {
    let done = false;
    booksClient.delete(mobyDick.isbn).subscribe(() => (done = true));

    const req = httpMock.expectOne(`http://localhost:4730/books/${mobyDick.isbn}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(done).toBe(true);
  });
});
