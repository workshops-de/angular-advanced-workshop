import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { Book } from '../book';
import { BookMarker } from '../book-marker';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
  imports: [DatePipe, BookMarker]
})
export class BookCard {
  customStyle = signal({ color: '#064D9E', fontWeight: 600 });

  readonly placeholderCover = 'book-cover-placeholder.svg';

  readonly book = input.required<Book>();
}
