import { TestBed } from '@angular/core/testing';
import { REMOTE_MODULE_LOADER } from '@bookmonkey/core';
import { RemoteRating } from './remote-rating';

describe('RemoteRating', () => {
  it('shows a hint when the remote cannot be loaded', async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: REMOTE_MODULE_LOADER,
          useValue: () => Promise.reject(new Error('remote is down'))
        }
      ]
    });

    const fixture = TestBed.createComponent(RemoteRating);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('currently not available');
  });
});
