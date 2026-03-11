import { Component, inject, input } from '@angular/core';
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
import { BookStore } from '../../../state/book-store/book-store';

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
    RouterLink
  ]
})
export class BookDetailComponent {
  protected readonly store = inject(BookStore);

  isbn = input.required<string>();

  remove() {
    this.store.removeBook({ bookISBN: this.isbn() });
  }
}
