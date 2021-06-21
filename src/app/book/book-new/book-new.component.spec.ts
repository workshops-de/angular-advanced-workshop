import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { BookNewComponent } from './book-new.component';

describe('<ws-book-new>', () => {
  const matInputSelector = '[data-test=isbn-field] input';

  let spectator: Spectator<BookNewComponent>;

  const createComponent = createComponentFactory({
    component: BookNewComponent,
    imports: [
      NoopAnimationsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      RouterTestingModule,
      HttpClientTestingModule
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
