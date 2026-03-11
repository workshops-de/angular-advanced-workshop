import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { signalStore } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';
import { tap } from 'rxjs';
import { failureOccurred } from './failure-events';

export const FailureStore = signalStore(
  { providedIn: 'root' },
  withEventHandlers((_, events = inject(Events), snackbar = inject(MatSnackBar)) => [
    events.on(failureOccurred).pipe(
      tap(({ payload }) => snackbar.open(payload.reason, 'Understood!', { duration: 5_000 }))
      // concatMap(({payload}) => logger.error(payload))
    )
  ])
);
