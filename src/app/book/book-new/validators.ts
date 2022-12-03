import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Observable, map, catchError, of, Subject, BehaviorSubject, first } from 'rxjs';
import { BookApiService } from '../book-api.service';

const state = new BehaviorSubject({ isbnAsync: 'Book alredy exists' });

const isbnRegex =
  '^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$';
export const isbnValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log(control.value);
  return (control.value as string).match(isbnRegex) ? null : { isbn: 'ISBN is doof' };
};

export const isbnAcyncValidator = (): AsyncValidatorFn => {
  const service = inject(BookApiService);

  return (control: AbstractControl<string>): Observable<ValidationErrors | null> => {
    console.log('async', control.value);
    // return state.pipe(first()); //Observable müssen completen
    return service.getByIsbn(control.value).pipe(
      map(() => ({ isbnAsync: 'Book alredy exists' })),
      catchError(() => of(null))
    );
  };
};
