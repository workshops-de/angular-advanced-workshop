import { CanDeactivateFn } from '@angular/router';

import { BookCreatePage } from './book-create-page/book-create-page';

// A `CanDeactivate` guard receives the component instance that is about to be
// left. We only interrupt the navigation when that page reports unsaved
// ("unsafe") changes - otherwise leaving is fine and we return `true`.
export const confirmLeaveGuardFn: CanDeactivateFn<BookCreatePage> = component => {
  if (!component.hasUnsafeChanges()) {
    return true;
  }

  return confirm('You have unsaved changes. Do you really want to leave?');
};
