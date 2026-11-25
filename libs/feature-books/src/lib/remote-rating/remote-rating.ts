import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, model, resource } from '@angular/core';
import { REMOTE_MODULE_LOADER } from '@bookmonkey/core';

/**
 * Shows the 5-star rating of the `rating` remote.
 *
 * The remote exposes a Web Component (`./RatingElement`). Loading the module registers
 * `<rating-stars-element>`. The host does not care which Angular version the remote uses:
 * it only talks to the element via properties and DOM events.
 * If the remote is not reachable, the host stays usable and shows a hint instead.
 */
@Component({
  selector: 'app-remote-rating',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (rating.hasValue()) {
      <rating-stars-element [value]="value()" (valueChange)="onValueChange($event)" />
    } @else if (rating.error()) {
      <p class="remote-rating-unavailable">The rating is currently not available.</p>
    } @else {
      <p>Loading rating...</p>
    }
  `
})
export class RemoteRating {
  private readonly loadRemoteModule = inject(REMOTE_MODULE_LOADER);

  readonly value = model(0);

  /** Resolves as soon as the remote registered the custom element. */
  protected readonly rating = resource({
    loader: async () => {
      await this.loadRemoteModule('rating', './RatingElement');
      return true;
    }
  });

  protected onValueChange(event: Event): void {
    this.value.set((event as CustomEvent<number>).detail);
  }
}
