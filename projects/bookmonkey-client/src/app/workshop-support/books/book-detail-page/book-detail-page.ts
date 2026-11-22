import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { BookDetail } from '../book-detail/book-detail';

@Component({
  selector: 'app-book-detail-page',
  imports: [RouterLink, BookDetail],
  templateUrl: './book-detail-page.html'
})
export class BookDetailPage {
  // private readonly booksClient = inject(BooksClient);
  // isbn = input('');
  // bookResource = this.booksClient.getByIsbn(this.isbn);
}
