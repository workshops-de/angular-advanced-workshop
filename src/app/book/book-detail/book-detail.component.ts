import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteBookStart, selectBookByIsbn } from '@store/book';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    AsyncPipe
  ]
})
export class BookDetailComponent {
  protected book$?: Observable<Book>;
  private isbnValue = '';

  constructor(private readonly store: Store) {}

  @Input({ required: true })
  set isbn(isbn: string) {
    this.book$ = this.store.select(selectBookByIsbn(isbn)).pipe(filter((book): book is Book => !!book));
    this.isbnValue = isbn;
  }

  remove() {
    this.store.dispatch(deleteBookStart({ bookIsbn: this.isbnValue }));
  }
}
