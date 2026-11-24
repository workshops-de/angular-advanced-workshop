import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Book } from './book';
import { BooksClient } from './books-client';
import { BooksConfig } from './books-config';

describe('BooksClient list()', () => {
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
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: BooksConfig,
          useValue: { resource: { value: signal({ apiUrl: 'http://localhost:4730' }) } }
        }
      ]
    });

    booksClient = TestBed.inject(BooksClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads books via GET', () => {
    let books: Book[] | undefined;
    booksClient.list().subscribe(result => (books = result));

    const req = httpMock.expectOne(r => r.url === 'http://localhost:4730/books');
    expect(req.request.method).toBe('GET');
    req.flush([mobyDick]);

    expect(books).toEqual([mobyDick]);
  });

  it('fails when the response violates the book schema', () => {
    let error: unknown;
    booksClient.list().subscribe({ error: err => (error = err) });

    const invalidBook = { ...mobyDick, id: 'not-a-uuid' };
    httpMock.expectOne(r => r.url === 'http://localhost:4730/books').flush([invalidBook]);

    expect(error).toBeInstanceOf(Error);
  });
});
