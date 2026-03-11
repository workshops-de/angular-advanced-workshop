import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';

export const failureOccurred = event('[Failure] Something bad happened', type<{ reason: string }>());
