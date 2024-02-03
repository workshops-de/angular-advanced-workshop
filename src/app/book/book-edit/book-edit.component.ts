import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBookByIsbn, updateBookStart } from '@store/book';
import { filter, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from '../models';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatError, MatButton, RouterLink, AsyncPipe]
})
export class BookEditComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);

  protected book$?: Observable<Book>;

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: [''],
    cover: ['']
  });

  ngOnInit() {
    this.loadBookByIsbn();
  }

  private loadBookByIsbn() {
    this.book$ = this.store.select(selectBookByIsbn).pipe(
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
    this.store.dispatch(updateBookStart({ patch: this.form.getRawValue() as Book }));
  }
}
