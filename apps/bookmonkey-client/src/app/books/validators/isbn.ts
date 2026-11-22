import { HttpErrorResponse } from '@angular/common/http';
import { SchemaPath, validateHttp } from '@angular/forms/signals';

export function uniqueIsbn(path: SchemaPath<string>): void {
  validateHttp(path, {
    request: ({ value }) => `http://localhost:4730/books/${value()}`,
    onSuccess: () => ({ kind: 'duplicateIsbn', message: 'This ISBN already exists' }),
    onError: error =>
      error instanceof HttpErrorResponse && error.status === 404
        ? null
        : { kind: 'checkFailed', message: 'Could not verify ISBN uniqueness' }
  });
}
