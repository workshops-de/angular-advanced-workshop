import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Book, bookNa } from '../models';
import { BookCardComponent } from './book-card.component';

describe('<ws-book-card>', () => {
  describe('unit', () => {
    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        TestBed.runInInjectionContext(() => {
          const component = new BookCardComponent();

          const na = 'n/a';

          const content = component.content();

          expect(content.title).toBe(na);
          expect(content.subtitle).toBe(na);
          expect(content.author).toBe(na);
        });
      });
    });
  });

  describe('template', () => {
    let spectator: Spectator<BookCardComponent>;
    let book: Book;

    const createComponent = createComponentFactory({
      component: BookCardComponent,
      providers: [provideRouter([])]
    });

    beforeEach(() => {
      spectator = createComponent();
      book = { ...bookNa(), title: 'My book' };
    });

    describe('When content is passed', () => {
      it('renders the content', () => {
        spectator.setInput({ content: book });
        expect(spectator.query('mat-card-title')).toContainText(book.title);
      });
    });

    describe('When no content is passed', () => {
      it('renders "n/a"', () => {
        expect(spectator.query('mat-card-title')).toContainText('n/a');
      });
    });
  });
});
