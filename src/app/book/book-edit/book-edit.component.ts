import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, bookNa } from '../models';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book = bookNa();

  constructor(private route: ActivatedRoute, private bookService: BookApiService) {}

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(switchMap(params => this.bookService.getByIsbn(params.isbn)))
        .subscribe(book => (this.book = book))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.sink.add(this.bookService.update(this.book.isbn as string, this.book).subscribe());
  }
}
