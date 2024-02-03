import { TestBed } from '@angular/core/testing';
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
});
