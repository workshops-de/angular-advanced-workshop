import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Book, bookNa } from '../../../data/models';

@Component({
  selector: 'ws-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    SlicePipe
  ]
})
export class BookCardComponent {
  readonly content = input<Book>(bookNa());
}
