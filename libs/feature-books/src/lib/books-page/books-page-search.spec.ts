import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-angular';
import { Book } from '../book';
import { BooksClient } from '../books-client';
import { BooksPage } from './books-page';

describe('BooksPage search', () => {
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

  async function renderBooksPage() {
    const booksClient = { list: () => of([mobyDick, friends]) };

    return render(BooksPage, {
      providers: [provideRouter([]), { provide: BooksClient, useValue: booksClient }]
    });
  }

  it('shows all books initially', async () => {
    await renderBooksPage();

    await expect.element(page.getByRole('heading', { level: 3, name: mobyDick.title })).toBeVisible();
    await expect.element(page.getByRole('heading', { level: 3, name: friends.title })).toBeVisible();
  });

  it('keeps only the books matching the search term', async () => {
    await renderBooksPage();

    await page.getByRole('searchbox').fill('Moby');

    await expect.element(page.getByRole('heading', { level: 3, name: mobyDick.title })).toBeVisible();
    await expect
      .element(page.getByRole('heading', { level: 3, name: friends.title }))
      .not.toBeInTheDocument();
  });
});
