import { Routes } from '@angular/router';
import { BookShell } from './book-shell';
import { BookNewComponent } from './features/create-book/book-new/book-new.component';
import { BookEditComponent } from './features/edit-book/book-edit/book-edit.component';
import { BookDetailComponent } from './features/view-book-details/book-detail/book-detail.component';
import { BookListComponent } from './features/view-books/book-list/book-list.component';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookShell,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'new',
        component: BookNewComponent
      },
      {
        path: ':isbn',
        component: BookDetailComponent
      },
      {
        path: ':isbn/edit',
        component: BookEditComponent
      }
    ]
  }
];
