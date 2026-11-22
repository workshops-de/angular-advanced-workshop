import { HttpErrorResponse, type HttpHandlerFn, type HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { Notifier } from '@workshop-support';

/**
 * Functional interceptor that catches failed HTTP requests and shows a
 * toast via `Notifier`. Register it with `withInterceptors([errorInterceptor])`.
 */
export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const notifier = inject(Notifier);

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        notifier.error(`Request failed: ${error.status} ${error.statusText}`);
      }
      return throwError(() => error);
    })
  );
}
