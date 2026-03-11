import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RuntimeConfiguration } from '../../runtime-configuration/runtime-configuration';
import { Book } from './models';

@Injectable({ providedIn: 'root' })
export class BookApiClient {
  private readonly http = inject(HttpClient);
  private readonly runtimeConfiguration = inject(RuntimeConfiguration);
  private readonly endpoint = this.runtimeConfiguration.apiEndpoints().books;

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}`);
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

  findAll(searchQuery: string) {
    return searchQuery.trim() === '' ? of([]) : this.http.get<Book[]>(`${this.endpoint}?q=${searchQuery}`);
  }
}
