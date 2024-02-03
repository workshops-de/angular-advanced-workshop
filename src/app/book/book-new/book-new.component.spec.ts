import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BookNewComponent } from './book-new.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('<ws-book-new>', () => {
  let fixture: ComponentFixture<BookNewComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookNewComponent],
      providers: [provideNoopAnimations(), provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });

    fixture = TestBed.createComponent(BookNewComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  describe('ISBN', () => {
    let isbnFormField: MatFormFieldHarness;
    let isbnInput: MatInputHarness;

    beforeEach(async () => {
      isbnFormField = await loader.getHarness(
        MatFormFieldHarness.with({ selector: 'mat-form-field:has(input[formControlName="isbn"])' })
      );
      isbnInput = (await isbnFormField.getControl()) as MatInputHarness;
    });

    describe('When an ISBN has less than 3 characters', () => {
      it('displays an error message', async () => {
        await isbnInput.setValue('12');
        await isbnInput.blur();

        const isbnErrors = await isbnFormField.getTextErrors();

        expect(isbnErrors).toContain('ISBN has to be at least 3 characters long.');
      });
    });

    describe('When an ISBN has 3 characters and more', () => {
      it('displays no error message', async () => {
        await isbnInput.setValue('123');
        await isbnInput.blur();

        const isbnErrors = await isbnFormField.getTextErrors();
        expect(isbnErrors).toEqual([]);

        await expectAsync(isbnFormField.hasErrors()).toBeResolvedTo(false);
      });
    });
  });
});
