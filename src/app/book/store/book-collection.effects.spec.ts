import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { createBookStart } from './book-collection.actions';
import { BookCollectionEffects } from './book-collection.effects';
import { bookCollection } from './book-collection.selectors';
import { bookFeatureName, bookReducers } from './book.feature';

describe('BookCollection: Effects', () => {
  let store: Store;
  let bookApiMock: jasmine.SpyObj<BookApiService>;

  beforeEach(() => {
    bookApiMock = jasmine.createSpyObj<BookApiService>(['create']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EffectsModule.forRoot([BookCollectionEffects]),
        StoreModule.forRoot({}),
        StoreModule.forFeature(bookFeatureName, bookReducers)
      ],
      providers: [{ provide: BookApiService, useFactory: () => bookApiMock }]
    });

    store = TestBed.inject(Store);
  });

  describe('When a book was created successfully', () => {
    it('caches the book locally', done => {
      const book = bookNa();

      bookApiMock.create.and.returnValue(of(book));

      store.dispatch(createBookStart({ book }));

      store.select(bookCollection).subscribe(books => {
        expect(books).toContain(book);
        done();
      });
    });
  });
});
