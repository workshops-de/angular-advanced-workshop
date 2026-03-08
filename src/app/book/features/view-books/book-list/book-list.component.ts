import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiClient } from '../../../data/book-api-client';
import { Book } from '../../../data/models';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  imports: [BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  private readonly bookService = inject(BookApiClient);

  protected books$: Observable<Book[]>;

  constructor() {
    this.books$ = this.bookService.getAll();
  }
}
