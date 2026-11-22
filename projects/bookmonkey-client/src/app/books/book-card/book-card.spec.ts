import { render, screen } from '@testing-library/angular';
import { BookCard } from './book-card';
import { Book } from '../book';

describe('BookCard', () => {
  const book: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  it('should display the book title', async () => {
    await render(BookCard, { componentInputs: { book } });

    expect(screen.getByText(book.title)).toBeInTheDocument();
  });

  it('should display the book author', async () => {
    await render(BookCard, { componentInputs: { book } });

    expect(screen.getByText(book.author!)).toBeInTheDocument();
  });
});
