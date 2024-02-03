import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBookByIsbn } from '@store/book';
import { EMPTY, filter, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatError, MatButton, RouterLink, AsyncPipe]
})
export class BookEditComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);

  protected book$: Observable<Book> = EMPTY;
  protected isbnValue = '';

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: [''],
    cover: ['']
  });

  isbn = input.required<string>();

  constructor() {
    effect(() => this.loadBookByIsbn(this.isbn()));
  }

  private loadBookByIsbn(isbn: string) {
    this.book$ = this.store.select(selectBookByIsbn(isbn)).pipe(
      filter(book => !!book),
      tap(book => this.fillForm(book))
    );
  }

  private fillForm(book: Book) {
    this.form.setValue({
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      abstract: book.abstract,
      isbn: book.isbn,
      cover: book.cover
    });
  }

  save() {
    this.bookService.update(this.isbn(), this.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
