import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Service, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import * as v from 'valibot';
import { Book, BooksCollectionSchema } from './book';
import { BooksConfig } from './books-config';

const BOOKS_API_URL = 'http://localhost:4730';

@Service()
export class BooksClient {
  private readonly http = inject(HttpClient);
  readonly #config = inject(BooksConfig).resource;

  /** `undefined` until `config/books.json` is loaded. Resources stay idle until then. */
  readonly #baseUrl = computed(() => this.#config.value()?.apiUrl);

  #requireBaseUrl(): string {
    const baseUrl = this.#baseUrl();
    if (!baseUrl) {
      throw new Error('The books configuration is not loaded.');
    }
    return baseUrl;
  }

  /** Stream variant of `getAll()` for the Signal Store. Uses a static endpoint. */
  list(): Observable<Book[]> {
    return this.#fetchBooks({ _start: 0, _end: 15, _sort: 'createdAt', _order: 'desc' });
  }

  /** Full-text search over all books. */
  search(query: string): Observable<Book[]> {
    return this.#fetchBooks({ q: query, _limit: 15 });
  }

  #fetchBooks(params: Record<string, string | number>): Observable<Book[]> {
    return this.http
      .get<unknown>(`${BOOKS_API_URL}/books`, { params })
      .pipe(map(books => v.parse(BooksCollectionSchema, books)));
  }

  getAll() {
    return httpResource<Book[]>(
      () => {
        const baseUrl = this.#baseUrl();
        if (!baseUrl) {
          return undefined;
        }
        return {
          url: `${baseUrl}/books`,
          params: {
            _start: 0,
            _end: 15,
            _sort: 'createdAt',
            _order: 'desc'
          }
        };
      },
      {
        defaultValue: [],
        parse: value => v.parse(BooksCollectionSchema, value)
      }
    );
  }

  getByIsbn(isbn: Signal<string>) {
    return httpResource<Book>(() => {
      const baseUrl = this.#baseUrl();
      return baseUrl ? { url: `${baseUrl}/books/${isbn()}` } : undefined;
    });
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.#requireBaseUrl()}/books`, book);
  }

  update(isbn: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.#requireBaseUrl()}/books/${isbn}`, book);
  }

  delete(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.#requireBaseUrl()}/books/${isbn}`);
  }
}
