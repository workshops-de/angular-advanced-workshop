import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { firstValueFrom } from 'rxjs';
import { BookApiService } from './book-api.service';
import { bookNa } from './models';

describe('☁️ BookApi', () => {
  let spectator: SpectatorHttp<BookApiService>;
  const createHttp = createHttpFactory(BookApiService);

  beforeEach(() => (spectator = createHttp()));

  describe('When the API responds with books', () => {
    it('provides books', async () => {
      const books = [bookNa()];
      const books$ = firstValueFrom(spectator.service.getAll());

      spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).flush(books);

      await expectAsync(books$).toBeResolvedTo(books);
    });
  });

  describe('When there is an Network error', () => {
    it('claims connectivity issues', async () => {
      const books$ = firstValueFrom(spectator.service.getAll());

      spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).error(new ProgressEvent('Network error'));

      await expectAsync(books$).toBeRejectedWithError('Sorry, we have connectivity issues.');
    });
  });

  describe('When the API responds with an error', () => {
    it('claims API issues', async () => {
      const books$ = firstValueFrom(spectator.service.getAll());

      spectator
        .expectOne('http://localhost:4730/books', HttpMethod.GET)
        .flush('No books', { status: 500, statusText: 'The API hung up' });

      await expectAsync(books$).toBeRejectedWithError('Sorry, we could not load any books');
    });
  });
});
