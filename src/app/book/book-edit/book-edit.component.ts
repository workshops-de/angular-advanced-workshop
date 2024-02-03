import { Component, DestroyRef, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPTY, filter, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectBookByIsbn } from '@store/book';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatError, MatButton, RouterLink, AsyncPipe]
})
export class BookEditComponent {
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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef,
    private readonly store: Store
  ) {}

  @Input({ required: true })
  set isbn(isbn: string) {
    this.book$ = this.store.select(selectBookByIsbn(isbn)).pipe(
      filter((book): book is Book => !!book),
      tap(book => {
        this.form.setValue({
          title: book.title,
          subtitle: book.subtitle,
          author: book.author,
          abstract: book.abstract,
          isbn: book.isbn,
          cover: book.cover
        });
      })
    );
    this.isbnValue = isbn;
  }

  save() {
    this.bookService
      .update(this.isbnValue, this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
