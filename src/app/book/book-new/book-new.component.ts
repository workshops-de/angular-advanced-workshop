import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  NonNullableFormBuilder,
  FormBuilder,
  FormGroup,
  FormArray,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';
import { isbnAcyncValidator, isbnValidator } from './validators';

export type IForm<T> = {
  [K in keyof T]: FormControl<T[K] | null>; // minus Fragezeichen setzt das value auf optional, key wird required
};
type BookForm = IForm<Book>;

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent implements OnDestroy {
  title = 'NEW!';
  sink = new Subscription();
  form: FormGroup<IForm<Book>>;
  authorsform!: FormGroup;
  ctrl = new UntypedFormControl();
  foo: string[] = [];
  authors!: FormArray<FormControl<string | null>>;

  constructor(private router: Router, private fb: FormBuilder, private bookService: BookApiService) {
    this.form = this.buildForm();

    const b: Book = this.form.getRawValue();
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book = { ...bookNa(), ...this.form.value, author: this.authors.value.join(', ') };
    this.sink.add(
      this.bookService
        .create(book)
        .pipe(tap(() => this.router.navigateByUrl('/')))
        .subscribe()
    );
  }

  private buildForm() {
    this.authors = this.fb.array([''] as string[]);

    this.authorsform = this.fb.group({
      authors: this.authors
    });

    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(13)], [isbnAcyncValidator()]], //isbnValidator
      title: ['', Validators.required],
      author: [''],
      cover: [''],
      abstract: [''],
      id: [''],
      numPages: [0],
      subtitle: [''],
      publisher: ['']
    });
  }

  addAuthor() {
    this.authors.push(new FormControl(''));
  }
}
