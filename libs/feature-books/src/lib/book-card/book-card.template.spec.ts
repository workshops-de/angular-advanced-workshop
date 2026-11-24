import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [BookMarkerStore] });

    fixture = TestBed.createComponent(BookCard);
    fixture.componentRef.setInput('book', book);
    await fixture.whenStable();
  });

  it('should display the book title', async () => {
    const title = fixture.nativeElement.querySelector('h3');

    await expect.poll(() => title.textContent).toContain(book.title);
  });

  it('should display the book author', async () => {
    const author = fixture.nativeElement.querySelector('h4');

    await expect.poll(() => author.textContent).toContain(book.author);
  });
});
