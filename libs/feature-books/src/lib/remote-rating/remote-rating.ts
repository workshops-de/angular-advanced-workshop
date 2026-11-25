import {
  Component,
  effect,
  inject,
  model,
  resource,
  Type,
  twoWayBinding,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { REMOTE_MODULE_LOADER } from '@bookmonkey/core';

/** What the `rating` remote exposes as `./Rating` (see apps/rating/federation.config.mjs). */
type RatingModule = { Rating: Type<unknown> };

/**
 * Loads the 5-star rating from the `rating` remote at runtime and renders it.
 * If the remote is not reachable, the host stays usable and shows a hint instead.
 */
@Component({
  selector: 'app-remote-rating',
  template: `
    @if (rating.error()) {
      <p class="remote-rating-unavailable">The rating is currently not available.</p>
    } @else if (rating.isLoading()) {
      <p>Loading rating...</p>
    }
    <ng-container #host />
  `
})
export class RemoteRating {
  private readonly loadRemoteModule = inject(REMOTE_MODULE_LOADER);
  private readonly host = viewChild.required('host', { read: ViewContainerRef });

  readonly value = model(0);

  protected readonly rating = resource({
    loader: () => this.loadRemoteModule<RatingModule>('rating', './Rating')
  });

  constructor() {
    effect(() => {
      const remote = this.rating.hasValue() ? this.rating.value() : undefined;
      if (remote) {
        this.host().createComponent(remote.Rating, {
          bindings: [twoWayBinding('value', this.value)]
        });
      }
    });
  }
}
