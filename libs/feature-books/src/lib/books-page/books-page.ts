import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { bookMatches } from '@bookmonkey/util';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BookMarkerStore } from '../book-marker-store';
import { BookStore } from '../state/book-store';

@Component({
  selector: 'app-books-page',
  imports: [BookCard, RouterLink],
  providers: [BookMarkerStore],
  templateUrl: './books-page.html'
})
export class BooksPage {
  router = inject(Router);
  bookMarkerStore = inject(BookMarkerStore);
  store = inject(BookStore);

  booksComputed = computed(() => {
    const markTerm = this.bookMarkerStore.markTerm();
    const books = this.store.bookEntities();

    return books.filter(book => bookMatches(book, markTerm));
  });

  async goToBookDetails(book: Book) {
    await this.router.navigate(['/books', 'detail', book.isbn]);
  }

  deleteBook(book: Book) {
    if (!window.confirm(`Delete "${book.title}"?`)) {
      return;
    }

    this.store.removeBook(book.isbn);
  }
}
