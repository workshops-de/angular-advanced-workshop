import { Component } from '@angular/core';

import { BookCreateForm } from '../book-create-form/book-create-form';

// Prepared template - copy this folder to src/app/books/book-create-page/ and
// wire it up: add a 'create' route that loads this page. The form is embedded
// but has no wiring yet - submission via the API client comes later.
@Component({
  selector: 'app-book-create-page',
  imports: [BookCreateForm],
  templateUrl: './book-create-page.html'
})
export class BookCreatePage {}
