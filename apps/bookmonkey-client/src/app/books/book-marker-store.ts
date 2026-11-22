import { effect, Service, signal } from '@angular/core';

@Service({ autoProvided: false })
export class BookMarkerStore {
  #markTerm = signal(localStorage.getItem('books.markTerm') ?? '');

  markTerm = this.#markTerm.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('books.markTerm', this.markTerm());
    });
  }

  setMarkTerm(markTerm: string) {
    this.#markTerm.set(markTerm);
  }
}
