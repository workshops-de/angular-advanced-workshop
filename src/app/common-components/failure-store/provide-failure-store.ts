import { inject, provideAppInitializer } from '@angular/core';
import { FailureStore } from './failure-store';

export function provideFailureStore() {
  return provideAppInitializer(() => {
    inject(FailureStore);
  });
}
