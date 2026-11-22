import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

/**
 * 5-star rating. This component is exposed via Native Federation (see federation.config.js).
 *
 * Usage: <rating-stars [(value)]="rating" [max]="5" [readonly]="false" />
 */
@Component({
  selector: 'rating-stars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rating.html',
  styleUrl: './rating.css'
})
export class Rating {
  /** Current rating (0 = no rating). */
  readonly value = model(0);
  /** Number of stars. */
  readonly max = input(5);
  readonly readonly = input(false);

  protected readonly stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));

  protected select(star: number): void {
    if (this.readonly()) {
      return;
    }
    // Clicking the current rating again resets it.
    this.value.set(this.value() === star ? 0 : star);
  }
}
