import { Directive, ElementRef, Renderer2, afterRenderEffect, inject, input } from '@angular/core';

import { classifyMarkSegments } from '@workshop-support';
import { BookMarkerStore } from './book-marker-store';

@Directive({ selector: '[appBookMarker]' })
export class BookMarker {
  private renderer = inject(Renderer2);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  private bookMarkerStore = inject(BookMarkerStore);

  rawText = input.required<string | undefined>();

  constructor() {
    afterRenderEffect(() => this.markText(this.rawText(), this.bookMarkerStore.markTerm()));
  }

  private markText(rawText: string | undefined, markTerm: string) {
    const segments = classifyMarkSegments(rawText, markTerm);

    this.renderer.setProperty(this.host.nativeElement, 'textContent', '');

    for (const segment of segments) {
      const text = this.renderer.createText(segment.text);
      const child = segment.shouldBeMarked ? this.wrapInMark(text) : text;

      this.renderer.appendChild(this.host.nativeElement, child);
    }
  }

  private wrapInMark(node: HTMLElement) {
    const mark = this.renderer.createElement('mark');

    this.renderer.addClass(mark, 'mark-hit');
    this.renderer.appendChild(mark, node);

    return mark;
  }
}
