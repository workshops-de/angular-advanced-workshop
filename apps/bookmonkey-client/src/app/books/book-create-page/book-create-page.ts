import { Component, signal } from '@angular/core';

import { BookCreateForm } from '../book-create-form/book-create-form';

@Component({
  selector: 'app-book-create',
  imports: [BookCreateForm],
  templateUrl: './book-create-page.html'
})
export class BookCreatePage {
  // Does the embedded form hold unsaved changes? Hard-coded for this exercise so
  // the guard has something to react to - a later exercise derives it from the
  // form's own dirty state.
  readonly hasUnsafeChanges = signal(true);
}
