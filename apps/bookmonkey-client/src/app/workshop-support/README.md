# workshop-support

Helper components and helper functions for the Angular workshop. Everything
in here is **finished code** — attendees build on top of it, but don't
implement it themselves. The public entry point is
[`public_api.ts`](./public_api.ts); always import from there, never from the
subfolders directly.

## What it provides

### Shell

- **`Sidebar`** ([`shell/sidebar/sidebar.ts`](./shell/sidebar/sidebar.ts)) —
  the app's navigation bar (Dashboard, Books, Create Book) using
  `routerLink`/`routerLinkActive`.
- **`Welcome`** ([`shell/welcome/welcome.ts`](./shell/welcome/welcome.ts)) —
  the welcome screen shown on the home page.

### Books

- **`bookMatches(book, searchTerm)`**
  ([`books/book-matches.ts`](./books/book-matches.ts)) — checks whether a
  book (title or author, case-insensitive) matches a search term. An empty
  search term matches every book.
- **`classifyMarkSegments(text, term)`**
  ([`books/classify-mark-segments.ts`](./books/classify-mark-segments.ts))
  — splits a text into segments and flags the ones matching a search term,
  so a template can render highlights without writing its own regex logic.

Both functions are deliberately pre-built: the exercise is about _using_
them (e.g. in a custom directive), not about implementing the string search
itself.

### Notifications

- **`Notifier`** ([`notifications/notifier.ts`](./notifications/notifier.ts))
  — service for showing toast notifications from anywhere in the app.
  The `Notification` and `NotificationKind` types belong to it.

  Implementation details (CDK `Overlay`/`Portal`) are documented in
  [`notifications/README.md`](./notifications/README.md).

## Usage

Always import from `public_api.ts`:

```ts
import { Sidebar, Welcome, bookMatches, classifyMarkSegments, Notifier } from '@workshop-support';
```

Examples:

```ts
// Search/filter a book list
const results = books.filter(book => bookMatches(book, searchTerm));
```

```ts
// Highlighting in a template
segments = computed(() => classifyMarkSegments(this.book().title, this.searchTerm()));
```

```html
@for (segment of segments(); track $index) {
<mark [class.bg-transparent]="!segment.shouldBeMarked">{{ segment.text }}</mark>
}
```

```ts
// Toast notifications
private notifier = inject(Notifier);

save() {
  this.bookService.save(this.book).subscribe({
    next: () => this.notifier.success('Book saved.'),
    error: () => this.notifier.error('Could not save the book.')
  });
}
```

`<app-sidebar>` and `<app-welcome>` are referenced as regular components in
a template; `Notifier`, on the other hand, needs **no** template tag — its
toast host is created automatically on first use.
