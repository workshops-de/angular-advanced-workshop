import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBookByIsbn, updateBookStart } from '@store/book';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatError, MatButton, RouterLink, AsyncPipe]
})
export class BookEditComponent implements OnInit {
  protected book$?: Observable<Book>;

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
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.book$ = this.store.select(selectBookByIsbn).pipe(
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
  }

  save() {
    this.store.dispatch(updateBookStart({ patch: this.form.getRawValue() as Book }));
  }
}
