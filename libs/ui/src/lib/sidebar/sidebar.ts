import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  pageLinks = signal({
    dashboard: '',
    books: '/books',
    booksCreate: '/books/create'
  });
}
