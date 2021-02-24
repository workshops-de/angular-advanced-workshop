import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBookStart } from '@store/book';
import { bookNa } from '../models';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.buildForm();
  }

  create() {
    const book = { ...bookNa(), ...this.form.value };

    this.store.dispatch(createBookStart({ book }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['']
    });
  }
}
