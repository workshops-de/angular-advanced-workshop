import { Routes } from '@angular/router';

export const bookRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./book.component').then(m => m.BookComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./book-list/book-list.component').then(m => m.BookListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./book-new/book-new.component').then(m => m.BookNewComponent)
      },
      {
        path: ':isbn',
        loadComponent: () => import('./book-detail/book-detail.component').then(m => m.BookDetailComponent)
      },
      {
        path: ':isbn/edit',
        loadComponent: () => import('./book-edit/book-edit.component').then(m => m.BookEditComponent)
      }
    ]
  }
];
