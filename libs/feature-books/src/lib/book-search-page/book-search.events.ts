import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Book } from '../book';

export const bookSearchEvents = eventGroup({
  source: 'Book Search',
  events: {
    searchQueryUpdated: type<{ query: string }>(),
    searchSucceeded: type<Book[]>(),
    searchFailed: type<string>()
  }
});
