import { Component, input } from '@angular/core';
import { Book } from '../../data/models';
import { BookCardComponent } from '../view-books/book-card/book-card.component';

@Component({
  selector: 'ws-books-grid',
  template: `
    <h2 class="mat-h2">Books</h2>

    <div class="books-grid">
      @for (book of books(); track book.id) {
        <ws-book-card [content]="book" />
      } @empty {
        No books found, yet. ✌️
      }
    </div>
  `,
  styles: `
    host {
      display: block;
      padding: 1rem;
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
  `,
  imports: [BookCardComponent]
})
export class BooksGrid {
  books = input.required<Book[]>();
}
