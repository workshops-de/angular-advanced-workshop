import { TestBed } from '@angular/core/testing';
import { provideState, provideStore, Store } from '@ngrx/store';
import { lastValueFrom, of, take } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { createBookStart } from './book-collection.actions';
import { BookCollectionEffects } from './book-collection.effects';
import { selectBookCollection } from './book-collection.selectors';
import { provideEffects } from '@ngrx/effects';
import { bookFeatureName, bookReducers } from './book.feature';

describe('BookCollection: Effects Integration Test', () => {
  let store: Store;
  let bookApiMock: jasmine.SpyObj<BookApiService>;

  beforeEach(() => {
    bookApiMock = jasmine.createSpyObj<BookApiService>(['create']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BookApiService, useValue: bookApiMock },
        provideEffects(BookCollectionEffects),
        provideStore(),
        provideState(bookFeatureName, bookReducers)
      ]
    });

    store = TestBed.inject(Store);
  });

  describe('When a book was created successfully', () => {
    it('caches the book locally', async () => {
      const book = bookNa();

      bookApiMock.create.and.returnValue(of(book));

      store.dispatch(createBookStart({ book }));

      const book$ = lastValueFrom(store.select(selectBookCollection).pipe(take(1)));
      await expectAsync(book$).toBeResolvedTo([book]);
    });
  });
});
