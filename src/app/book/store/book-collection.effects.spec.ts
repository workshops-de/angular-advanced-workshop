import { TestBed } from '@angular/core/testing';
import { Action, provideState, provideStore, Store } from '@ngrx/store';
import { lastValueFrom, of, ReplaySubject, take } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { createBookComplete, createBookStart } from './book-collection.actions';
import { BookCollectionEffects } from './book-collection.effects';
import { selectBookCollection } from './book-collection.selectors';
import { provideEffects } from '@ngrx/effects';
import { bookFeatureName, bookReducers } from './book.feature';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

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
