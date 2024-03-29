import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { provideState } from '@ngrx/store';
import { BookCollectionEffects, bookFeatureName, bookReducers } from '@store/book';
import { provideEffects } from '@ngrx/effects';

export const bookRoutes: Routes = [
  {
    providers: [provideState(bookFeatureName, bookReducers), provideEffects(BookCollectionEffects)],
    path: '',
    component: BookComponent,
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
