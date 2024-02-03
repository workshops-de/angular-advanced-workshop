import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookCollectionSlice, bookFeatureName } from '@store/book';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { BookCardComponent } from '../book-card/book-card.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  standalone: true,
  imports: [NgFor, BookCardComponent, AsyncPipe]
})
export class BookListComponent {
  protected books$: Observable<ReadonlyArray<Book>>;

  // TODO: The typing of Store<T> is temporary and wont be needed after we
  //       have introduced selectors.
  constructor(private readonly store: Store<{ [bookFeatureName]: { bookCollection: BookCollectionSlice } }>) {
    this.books$ = this.store.select(state => state[bookFeatureName].bookCollection.entities);
  }
}
