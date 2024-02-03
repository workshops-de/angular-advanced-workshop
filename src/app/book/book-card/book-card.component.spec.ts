import { Book, bookNa } from '../models';
import { BookCardComponent } from './book-card.component';
import { provideRouter } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('<ws-book-card>', () => {
  describe('unit', () => {
    describe('When no content is passed', () => {
      it('defaults to "n/a"', () => {
        const na = 'n/a';
        const component = new BookCardComponent();

        expect(component.content.title).toBe(na);
        expect(component.content.subtitle).toBe(na);
        expect(component.content.author).toBe(na);
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
