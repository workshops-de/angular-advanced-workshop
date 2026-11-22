import { Component, inject, signal } from '@angular/core';
import { applyEach, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { BooksClient } from '../books-client';
import { CoAuthorInput } from '../co-author-input/co-author-input';
import { validAuthorName } from '../validators/author';
import { uniqueIsbn } from '../validators/isbn';

@Component({
  selector: 'app-book-create-form',
  imports: [FormField, FormRoot, CoAuthorInput],
  templateUrl: './book-create-form.html'
})
export class BookCreateForm {
  private readonly booksClient = inject(BooksClient);

  // The form model mirrors the Book payload, so submission can hand it straight
  // to the API. `author` stays a single value, `coAuthors` is the collection.
  protected readonly model = signal({
    isbn: '',
    title: '',
    subtitle: '',
    author: '',
    coAuthors: [] as string[],
    abstract: '',
    cover: ''
  });

  protected readonly form = form(
    this.model,
    schemaPath => {
      required(schemaPath.isbn, { message: 'Please insert an ISBN.' });
      uniqueIsbn(schemaPath.isbn);
      required(schemaPath.title, { message: 'Please insert a title.' });
      required(schemaPath.author, { message: 'Please insert an Author.' });
      validAuthorName(schemaPath.author);
      applyEach(schemaPath.coAuthors, coAuthor => {
        required(coAuthor, { message: 'Please insert a co-author name.' });
        validAuthorName(coAuthor);
      });
    },
    {
      submission: {
        action: async () => {
          try {
            // The model already matches the Book schema – no reshaping needed.
            await firstValueFrom(this.booksClient.create(this.model()));
            return null;
          } catch {
            return { kind: 'server', message: 'Failed to create book' };
          }
        }
      }
    }
  );

  addCoAuthor() {
    this.model.update(m => ({ ...m, coAuthors: [...m.coAuthors, ''] }));
  }

  removeCoAuthor(coAuthorIndex: number) {
    this.model.update(m => ({ ...m, coAuthors: m.coAuthors.filter((_, i) => i !== coAuthorIndex) }));
  }
}
