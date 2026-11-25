import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Rating } from './rating';

/**
 * Exposed via Native Federation as `./RatingElement`.
 *
 * Wraps the Angular component into a Custom Element (Web Component). The remote brings its own
 * Angular (see `skip` in federation.config.mjs), so the host does not need to run the same version:
 * it only sees `<rating-stars-element [value]="…" (valueChange)="…">`.
 *
 * Inputs become properties (`value`, `max`, `readonly`), the `value` model emits a `valueChange` CustomEvent.
 */
createApplication({ providers: [provideBrowserGlobalErrorListeners()] })
  .then(({ injector }) => {
    if (!customElements.get('rating-stars-element')) {
      customElements.define('rating-stars-element', createCustomElement(Rating, { injector }));
    }
  })
  .catch(err => console.error(err));
