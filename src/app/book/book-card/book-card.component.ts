import { Component, Input } from '@angular/core';
import { Title, By } from '@angular/platform-browser';
import { Book, bookNa } from '../models';

@Component({
  selector: 'ws-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() content: Book = bookNa();
  // btn: HTMLElement;

  constructor(private title: Title) {
    this.title.setTitle('Foo');
    // By.
  }

  // setValue(value: Book) {
  //   setTimeout(() => (this.content = value), 1);
  // }

  // constructor() {
  //   const start = new Date();
  //   this.setValue(bookNa());
  //   const end = new Date();
  //   dom.update();
  //   const curration = end - start;
  // }
}

// constextStack = [
//   // setValue(),
//   // setTimeout,
//   // contentzuweisung
// ]
