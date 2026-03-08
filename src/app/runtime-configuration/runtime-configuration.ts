import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RuntimeConfiguration {
  apiEndpoints = signal<{ books: string }>({
    books: ''
  });
}
