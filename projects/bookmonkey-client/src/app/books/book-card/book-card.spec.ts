import { render, screen } from '@testing-library/angular';
import { Book } from '../book';
import { BookMarkerStore } from '../book-marker-store';
import { BookCard } from './book-card';

describe('BookCard', () => {
  const book: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  it('should display the book title', async () => {
    await render(BookCard, { componentInputs: { book }, providers: [BookMarkerStore] });

    expect(screen.getByText(book.title)).toBeInTheDocument();
  });

  it('should display the book author', async () => {
    await render(BookCard, { componentInputs: { book }, providers: [BookMarkerStore] });

    expect(screen.getByText(book.author!)).toBeInTheDocument();
  });
});
