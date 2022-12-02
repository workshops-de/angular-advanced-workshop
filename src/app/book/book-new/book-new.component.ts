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
  FormArray
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';

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
  sink = new Subscription();
  form: FormGroup<IForm<Book>>;
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
    const book = { ...bookNa(), ...this.form.value };
    this.sink.add(
      this.bookService
        .create(book)
        .pipe(tap(() => this.router.navigateByUrl('/')))
        .subscribe()
    );
  }

  private buildForm() {
    this.authors = this.fb.array([] as string[]);

    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: [''],
      cover: [''],
      abstract: [''],
      id: [''],
      numPages: [0],
      subtitle: [''],
      publisher: ['']
    });

    // return new FormGroup({
    //   isbn: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   title: new FormControl('', Validators.required),
    //   author: new FormControl('', Validators.required),
    //   cover: new FormControl(''),
    //   abstract: new FormControl(''),
    //   id: new FormControl(''),
    //   numPages: new FormControl(0),
    //   subtitle: new FormControl(''),
    //   publisher: new FormControl('')
    // });
  }
}
