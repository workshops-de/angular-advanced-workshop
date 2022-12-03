import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import {} from '@angular/material/form-field';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { BookNewComponent } from './book-new.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BookNewComponent', () => {
  let fixture: ComponentFixture<BookNewComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
      ]
    });
    fixture = TestBed.createComponent(BookNewComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should show error minlength', async () => {
    const inputHrnes = await loader.getHarness(MatInputHarness.with({ selector: '[formControlName="isbn"]' }));
    inputHrnes.setValue('12');
    inputHrnes.blur();
    const errors = await (await loader.getHarness(MatFormFieldHarness)).getTextErrors();

    expect(errors).toContain('ISBN has to be at least 3 characters long.');
  });
});
