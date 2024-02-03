import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCollection } from '@store/book';
import { Observable } from 'rxjs';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../models';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  imports: [BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  private readonly store = inject(Store);
  protected books$: Observable<ReadonlyArray<Book>>;

  constructor() {
    this.books$ = this.store.select(selectBookCollection);
  }
}
