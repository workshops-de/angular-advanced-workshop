import { Component, computed, signal } from '@angular/core';

const PLACEHOLDER_COVER = 'book-cover-placeholder.svg';

@Component({
  selector: 'app-book-edit-form',
  templateUrl: './book-edit-form.html'
})
export class BookEditForm {
  // Only used for the cover preview - replaced by Signal Forms later in the workshop.
  protected readonly coverUrl = signal('');
  protected readonly coverBroken = signal(false);
  protected readonly coverPreview = computed(() => {
    const url = this.coverUrl().trim();
    return url && !this.coverBroken() ? url : PLACEHOLDER_COVER;
  });

  protected onCoverInput(value: string): void {
    this.coverUrl.set(value);
    this.coverBroken.set(false);
  }
}
