import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookCollectionSlice, bookFeatureName } from '@store/book';
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
  private readonly store = inject<Store<{ [bookFeatureName]: { bookCollection: BookCollectionSlice } }>>(Store);
  protected books$: Observable<ReadonlyArray<Book>>;

  // TODO: The typing of Store<T> is temporary and wont be needed after we
  //       have introduced selectors.
  // TODO: ESLint will complain about prop-drilling here, but we will fix that later.
  constructor() {
    this.books$ = this.store.select(state => state[bookFeatureName].bookCollection.entities);
  }
}
