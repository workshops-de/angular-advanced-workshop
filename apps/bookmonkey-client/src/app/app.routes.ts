import { Routes } from '@angular/router';
import { Welcome } from '@bookmonkey/feature-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: () => import('@bookmonkey/feature-books').then(mod => mod.bookRoutes)
  }
];
