import '@analogjs/vitest-angular/setup-serializers';
import '@analogjs/vitest-angular/setup-snapshots';
import '@angular/compiler';
import '@testing-library/jest-dom/vitest';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({ browserMode: true });

beforeEach(() => localStorage.clear());
