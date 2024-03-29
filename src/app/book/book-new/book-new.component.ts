import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { createBookStart } from '@store/book';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatButton, RouterLink, MatLabel]
})
export class BookNewComponent {
  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: ['']
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  create() {
    const book = { ...bookNa(), ...this.form.getRawValue() };

    this.store.dispatch(createBookStart({ book }));
  }
}
