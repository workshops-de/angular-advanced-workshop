import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

import { BookNewComponent } from './book-new.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputHarness } from '@angular/material/input/testing';

describe('BookNewComponent', () => {
  let fixture: ComponentFixture<BookNewComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
      imports: [NoopAnimationsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(BookNewComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  describe('Isbn Formforeld', () => {
    it('should show error if less than 3 chars', async () => {
      const isbnFormField = await loader.getHarness(MatFormFieldHarness.with({ selector: '[data-test=isbn-field]' }));
      const isbnInput = (await isbnFormField.getControl()) as MatInputHarness;

      await isbnInput.setValue('12');
      await isbnInput.blur();

      const isbnErrors = await isbnFormField.getTextErrors();

      expect(isbnErrors).toContain('ISBN has to be at least 3 characters long.');
    });
  });
});
