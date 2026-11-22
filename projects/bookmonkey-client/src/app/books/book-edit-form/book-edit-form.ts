import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, readonly, required } from '@angular/forms/signals';
import { Book } from '../book';
import { validAuthorName } from '../validators/author';

const PLACEHOLDER_COVER = 'book-cover-placeholder.svg';

// Optional Book fields need a value so every field in the form has something to bind to.
const emptyBookForm = { isbn: '', title: '', subtitle: '', author: '', abstract: '', cover: '' };

@Component({
  selector: 'app-book-edit-form',
  imports: [FormField, FormRoot],
  templateUrl: './book-edit-form.html'
})
export class BookEditForm {
  readonly book = input.required<Book>();
  readonly save = output<Book>();

  protected readonly placeholderCover = PLACEHOLDER_COVER;

  // Inputs are read-only and unavailable in field initializers, so the form edits a writable copy.
  protected readonly model = linkedSignal(() => ({ ...emptyBookForm, ...this.book() }));

  protected readonly form = form(
    this.model,
    schemaPath => {
      readonly(schemaPath.isbn);
      required(schemaPath.title, { message: 'Please insert a title.' });
      required(schemaPath.author, { message: 'Please insert an Author.' });
      validAuthorName(schemaPath.author);
    },
    {
      submission: {
        // Only announce the edited book - sending it is up to the parent.
        action: async () => {
          this.save.emit(this.model());
          return null;
        }
      }
    }
  );
}
