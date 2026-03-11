import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Book } from '../../data/models';

export const bookSearchEvents = eventGroup({
  source: 'Book Search',
  events: {
    searchQueryUpdated: type<string>(),
    searchMatched: type<Book[]>(),
    searchDidNotMatch: type<void>(),
    searchFailed: type<string>()
  }
});
