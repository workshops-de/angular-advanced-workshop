import { Routes } from '@angular/router';
import { BooksPage } from './books-page/books-page';
import { confirmLeaveGuardFn } from './confirm-leave';

export const bookRoutes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'create',
    loadComponent: () => import('./book-create-page/book-create-page').then(c => c.BookCreatePage),
    canDeactivate: [confirmLeaveGuardFn]
  },
  {
    path: 'detail/:isbn',
    loadComponent: () => import('./book-detail-page/book-detail-page').then(c => c.BookDetailPage)
  },
  {
    path: 'edit/:isbn',
    loadComponent: () =>
      import('./book-edit-page/book-edit-page').then(c => c.BookEditPage)
  }
];
