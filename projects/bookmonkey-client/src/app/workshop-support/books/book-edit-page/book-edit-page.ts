import { Component } from '@angular/core';

import { BookEditForm } from '../book-edit-form/book-edit-form';

// Prepared template - copy this folder to src/app/books/book-edit-page/ and
// wire the data: read the :isbn route param via an input, load the book and
// pass it into the form. The form is embedded but has no wiring yet.
@Component({
  selector: 'app-book-edit-page',
  imports: [BookEditForm],
  templateUrl: './book-edit-page.html'
})
export class BookEditPage {}
