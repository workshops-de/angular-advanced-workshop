import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { bookMatches } from '@bookmonkey/util';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';
import { BookMarkerStore } from '../book-marker-store';
import { BooksClient } from '../books-client';
import { BookStore } from '../state/book-store';

@Component({
  selector: 'app-books-page',
  imports: [BookCard, RouterLink],
  providers: [BookMarkerStore],
  templateUrl: './books-page.html'
})
export class BooksPage {
  router = inject(Router);
  booksClient = inject(BooksClient);
  bookMarkerStore = inject(BookMarkerStore);
  store = inject(BookStore);

  booksResource = this.booksClient.getAll();

  booksComputed = computed(() => {
    const markTerm = this.bookMarkerStore.markTerm();
    const books = this.store.books();

    return books.filter(book => bookMatches(book, markTerm));
  });

  async goToBookDetails(book: Book) {
    await this.router.navigate(['/books', 'detail', book.isbn]);
  }

  async deleteBook(book: Book) {
    if (!window.confirm(`Delete "${book.title}"?`)) {
      return;
    }

    await lastValueFrom(this.booksClient.delete(book.isbn));
    this.booksResource.reload();
  }
}
