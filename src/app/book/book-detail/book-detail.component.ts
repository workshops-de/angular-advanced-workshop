import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class BookDetailComponent implements OnInit {
  private readonly store = inject(Store);

  protected book$?: Observable<Book>;

  ngOnInit(): void {
    this.book$ = this.store.select(selectBookByIsbn).pipe(filter((book): book is Book => !!book));
  }

  remove() {
    this.store.dispatch(deleteBookStart());
  }
}
