import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { Book } from '../book';
import { BookMarkerStore } from '../book-marker-store';
import { BookCard } from './book-card';

describe('BookCard template', () => {
  const book: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  async function renderBookCard() {
    TestBed.configureTestingModule({ providers: [BookMarkerStore] });

    const bookCard = TestBed.createComponent(BookCard);
    bookCard.componentRef.setInput('book', book);
    await bookCard.whenStable();

    return page.elementLocator(bookCard.nativeElement);
  }

  it('should display the book title', async () => {
    const root = await renderBookCard();

    await expect.element(root.getByRole('heading', { level: 3 })).toHaveTextContent(book.title);
  });

  it('should display the book author', async () => {
    const root = await renderBookCard();

    await expect.element(root.getByRole('heading', { level: 4 })).toHaveTextContent(book.author!);
  });

  // Prüft die echte Darstellung im Browser (Layout, CSS), was jsdom nicht kann.
  it('should be visible with a real layout', async () => {
    const root = await renderBookCard();

    await expect.element(root).toBeVisible();
  });
});
