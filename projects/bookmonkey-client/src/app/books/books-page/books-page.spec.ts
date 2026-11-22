import { Component, input, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BooksPage } from './books-page';
import { BookCard } from '../book-card/book-card';
import { BooksClient } from '../books-client';
import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  template: `<div data-testid="mock-book-card">{{ book().title }}</div>`
})
class BookCardMock {
  book = input.required<Book>();
}

describe('BooksPage', () => {
  const mobyDick: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };
  const friends: Book = {
    id: 'b3c8f5d1-9e2a-4a7b-8c6d-5f4e3d2c1b0a',
    isbn: '978-0-671-72322-5',
    cover: '',
    title: 'How to win friends',
    author: 'Dale Carnegie'
  };

  function mockBooksResource(books: Book[]) {
    return { value: signal(books), isLoading: signal(false), error: signal(undefined) };
  }

  it('renders all books from the mocked BooksClient', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      importOverrides: [{ replace: BookCard, with: BookCardMock }],
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    expect(screen.getByText(mobyDick.title)).toBeInTheDocument();
    expect(screen.getByText(friends.title)).toBeInTheDocument();
    expect(booksClientMock.getAll).toHaveBeenCalled();
  });

  it('filters books by the search term', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      importOverrides: [{ replace: BookCard, with: BookCardMock }],
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    const user = userEvent.setup();
    await user.type(screen.getByRole('searchbox'), 'Moby');

    expect(screen.getByText(mobyDick.title)).toBeInTheDocument();
    expect(screen.queryByText(friends.title)).not.toBeInTheDocument();
  });

  it('renders one book card per book, without depending on BookCard internals', async () => {
    const booksClientMock = {
      getAll: vi.fn().mockReturnValue(mockBooksResource([mobyDick, friends]))
    };

    await render(BooksPage, {
      importOverrides: [{ replace: BookCard, with: BookCardMock }],
      providers: [{ provide: BooksClient, useValue: booksClientMock }]
    });

    const cards = screen.getAllByTestId('mock-book-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Moby Dick');
    expect(cards[1]).toHaveTextContent('How to win friends');
  });
});
