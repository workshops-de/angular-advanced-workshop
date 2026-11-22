# Libraries

Code shared by the apps lives in `libs/`. Each library has one public entry point (`src/index.ts`); import from the alias, never from subfolders.

| Library             | Alias                           | Category | Content                                                       |
| ------------------- | ------------------------------- | -------- | ------------------------------------------------------------- |
| `core`              | `@bookmonkey/core`              | core     | `Notifier` service and its `NotificationHost` toast component |
| `ui`                | `@bookmonkey/ui`                | ui       | `Sidebar` navigation                                          |
| `util`              | `@bookmonkey/util`              | util     | `bookMatches`, `classifyMarkSegments` (pure functions)        |
| `feature-dashboard` | `@bookmonkey/feature-dashboard` | feature  | `Welcome` page                                                |
| `feature-books`     | `@bookmonkey/feature-books`     | feature  | Whole books topic: pages, forms, `BooksClient`, routes        |

Everything here is **finished code**. Attendees build on top of it.

## Usage

```ts
import { Notifier } from '@bookmonkey/core';
import { Sidebar } from '@bookmonkey/ui';
import { bookMatches, classifyMarkSegments } from '@bookmonkey/util';
```

Implementation details of the notifications (CDK `Overlay`/`Portal`) are documented in [`core/src/lib/notifications/README.md`](./core/src/lib/notifications/README.md).

```ts
// Toast notifications - no template tag needed, the host is created on first use
private notifier = inject(Notifier);

save() {
  this.bookService.save(this.book).subscribe({
    next: () => this.notifier.success('Book saved.'),
    error: () => this.notifier.error('Could not save the book.')
  });
}
```
