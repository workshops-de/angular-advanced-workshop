import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideStore } from '@ngrx/store';
import { BookNewComponent } from './book-new.component';

describe('<ws-book-new>', () => {
  const matInputSelector = 'input[formControlName="isbn"]';

  let spectator: Spectator<BookNewComponent>;

  const createComponent = createComponentFactory({
    component: BookNewComponent,
    providers: [
      provideNoopAnimations(),
      provideHttpClient(),
      provideHttpClientTesting(),
      provideRouter([]),
      provideStore()
    ]
  });

  beforeEach(() => (spectator = createComponent()));

  describe('When an ISBN has less than 3 characters', () => {
    it('displays an error message', async () => {
      spectator.typeInElement('12', matInputSelector);
      spectator.blur(matInputSelector);

      expect(spectator.queryAll('mat-error')).toContainText('ISBN has to be at least 3 characters long.');
    });
  });
});
