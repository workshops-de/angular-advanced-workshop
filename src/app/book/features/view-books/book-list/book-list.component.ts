import { Component, inject } from '@angular/core';
import { BookStore } from '../../../state/book-store/book-store';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html',
  imports: [BookCardComponent]
})
export class BookListComponent {
  protected readonly bookStore = inject(BookStore);
}
