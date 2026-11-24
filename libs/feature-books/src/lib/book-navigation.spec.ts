import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { page } from 'vitest/browser';
import { Book } from './book';
import { bookRoutes } from './book.routes';
import { BooksClient } from './books-client';

describe('Book navigation', () => {
  const mobyDick: Book = {
    id: 'a1b76e0a-6f19-4c9c-9d3e-1b7f5e2a1c7c',
    isbn: '978-3-16-148410-0',
    cover: '',
    title: 'Moby Dick',
    author: 'Herman Melville'
  };

  beforeEach(() => {
    // Echte Routen, echter Router, echter Store. Nur die Außengrenze (HTTP) ist ersetzt.
    TestBed.configureTestingModule({
      providers: [
        provideRouter(bookRoutes, withComponentInputBinding()),
        { provide: BooksClient, useValue: { list: () => of([mobyDick]) } }
      ]
    });
  });

  it('opens the detail page when clicking "More" on a book card', async () => {
    await RouterTestingHarness.create('/');

    await page.getByRole('link', { name: 'More' }).click();

    await expect.poll(() => TestBed.inject(Router).url).toBe(`/detail/${mobyDick.isbn}`);
    await expect.element(page.getByRole('heading', { level: 1, name: mobyDick.title })).toBeVisible();
  });
});
