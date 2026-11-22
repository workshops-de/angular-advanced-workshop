import { Component, inject, input } from '@angular/core';

import { Book } from '../book';
import { BookEditForm } from '../book-edit-form/book-edit-form';
import { BooksClient } from '../books-client';

@Component({
  selector: 'app-book-edit-page',
  imports: [BookEditForm],
  templateUrl: './book-edit-page.html'
})
export class BookEditPage {
  private readonly booksClient = inject(BooksClient);

  readonly isbn = input.required<string>();

  protected readonly bookResource = this.booksClient.getByIsbn(this.isbn);

  protected saveBook(book: Book) {
    this.booksClient.update(book.isbn, book).subscribe();
  }
}
