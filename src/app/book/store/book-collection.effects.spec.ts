import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideEffects } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, provideState, provideStore, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, of, ReplaySubject, take } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { createBookComplete, createBookStart } from './book-collection.actions';
import { BookCollectionEffects } from './book-collection.effects';
import { selectBookCollection } from './book-collection.selectors';
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
    /**
     *
     * Without a few details this test would be flaky.
     * We are dealing with an asynchronous operation here.
     *
     * It is possible that the selector reads values from the store before the service has returned.
     *
     * That's why we wrap this in a fakeAsync zone and use `tick()` to simulate the passage of time.
     *
     */
    it('caches the book locally', fakeAsync(async () => {
      const book = bookNa();

      bookApiMock.create.and.returnValue(of(book));

      store.dispatch(createBookStart({ book }));

      tick(500);

      const books = await lastValueFrom(store.select(selectBookCollection).pipe(take(1)));

      expect(books.length).toBe(1);
      expect(books[0]).toEqual(book);
    }));
  });
});

describe('BookCollection: Effects', () => {
  let bookApiMock: jasmine.SpyObj<BookApiService>;
  let effect: BookCollectionEffects;
  let actions$: ReplaySubject<Action>;

  beforeEach(() => {
    bookApiMock = jasmine.createSpyObj<BookApiService>(['create']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BookApiService, useValue: bookApiMock },
        BookCollectionEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectBookCollection,
              value: []
            }
          ]
        })
      ]
    });

    actions$ = new ReplaySubject();
    effect = TestBed.inject(BookCollectionEffects);
  });

  describe('When a book was created successfully', () => {
    it('dispatches createBookComplete', async () => {
      const book = bookNa();
      bookApiMock.create.and.returnValue(of(book));

      actions$.next(createBookStart({ book }));

      const book$ = lastValueFrom(effect.create.pipe(take(1)));
      await expectAsync(book$).toBeResolvedTo(createBookComplete({ book }));

      expect(bookApiMock.create).toHaveBeenCalledWith(book);
    });
  });
});
