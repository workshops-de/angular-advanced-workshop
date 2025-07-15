import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ws-book-list',
    styleUrls: ['./book-list.component.scss'],
    templateUrl: 'book-list.component.html',
    imports: [BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  private readonly bookService = inject(BookApiService);

  protected books$: Observable<Book[]>;

  constructor() {
    this.books$ = this.bookService.getAll();
  }
}
