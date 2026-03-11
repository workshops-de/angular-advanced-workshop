import { Routes } from '@angular/router';
import { BookShell } from './book-shell';
import { BookSearchPage } from './features/search-books/book-search-page';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BookShell,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/view-books/book-list/book-list.component').then(m => m.BookListComponent)
      },
      {
        path: 'search',
        component: BookSearchPage
      },
      {
        path: 'new',
        loadComponent: () => import('./features/create-book/book-new/book-new.component').then(m => m.BookNewComponent)
      },
      {
        path: ':isbn',
        loadComponent: () => import('./features/view-book-details/book-detail/book-detail.component').then(m => m.BookDetailComponent)
      },
      {
        path: ':isbn/edit',
        loadComponent: () => import('./features/edit-book/book-edit/book-edit.component').then(m => m.BookEditComponent)
      }
    ]
  }
];
