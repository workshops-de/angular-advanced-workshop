import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import * as v from 'valibot';
import { Book, BooksCollectionSchema } from './book';

@Service()
export class BooksClient {
  #baseUrl = 'http://localhost:4730';

  private readonly http = inject(HttpClient);

  getAll() {
    return httpResource<Book[]>(
      () => ({
        url: `${this.#baseUrl}/books`,
        params: {
          _start: 0,
          _end: 15,
          _sort: 'createdAt',
          _order: 'desc'
        }
      }),
      {
        defaultValue: [],
        parse: value => v.parse(BooksCollectionSchema, value)
      }
    );
  }

  getByIsbn(isbn: Signal<string>) {
    return httpResource<Book>(() => ({
      url: `${this.#baseUrl}/books/${isbn()}`
    }));
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.#baseUrl}/books`, book);
  }

  update(isbn: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.#baseUrl}/books/${isbn}`, book);
  }

  delete(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.#baseUrl}/books/${isbn}`);
  }
}
