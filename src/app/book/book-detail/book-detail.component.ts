import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteBookStart, selectBookByIsbn } from '@store/book';
import { filter, Observable } from 'rxjs';
import { Book } from '../models';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html',
  imports: [
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
  private readonly store = inject(Store);

  protected book$?: Observable<Book>;

  isbn = input.required<string>();

  constructor() {
    effect(() => this.loadBookByIsbn(this.isbn()));
  }

  remove() {
    this.store.dispatch(deleteBookStart({ bookIsbn: this.isbn() }));
  }

  private loadBookByIsbn(isbn: string) {
    this.book$ = this.store.select(selectBookByIsbn(isbn)).pipe(filter(book => !!book));
  }
}
