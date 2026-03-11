import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Book } from '../../data/models';

export const bookSearchEvents = eventGroup({
  source: '[Book Search]',
  events: {
    searchQueryUpdated: type<string>(),
    searchSucceeded: type<Book[]>(),
    searchFailed: type<string>()
  }
});
