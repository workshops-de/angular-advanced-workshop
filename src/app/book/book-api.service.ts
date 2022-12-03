import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Book } from './models';

@Injectable({ providedIn: 'root' })
export class BookApiService {
  private endpoint = 'http://localhost:4730/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.endpoint}`)
      .pipe(
        catchError(error =>
          throwError(
            () =>
              new Error(
                error.status >= 500 ? 'Sorry, we could not load any books' : 'Sorry, we have connectivity issues'
              )
          )
        )
      );
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoint}/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.endpoint}`, book);
  }

  update(isbn: string, patch: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.endpoint}/${isbn}`, patch);
  }

  delete(isbn: string): Observable<Book> {
    return this.http.delete<Book>(`${this.endpoint}/${isbn}`);
  }
}
