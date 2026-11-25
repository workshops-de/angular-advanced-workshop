import { TestBed } from '@angular/core/testing';
import { REMOTE_MODULE_LOADER } from '@bookmonkey/core';
import { RemoteRating } from './remote-rating';

describe('RemoteRating', () => {
  function create(loader: () => Promise<unknown>) {
    TestBed.configureTestingModule({
      providers: [{ provide: REMOTE_MODULE_LOADER, useValue: loader }]
    });
    return TestBed.createComponent(RemoteRating);
  }

  it('renders the custom element of the remote', async () => {
    const fixture = create(() => Promise.resolve({}));
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('rating-stars-element')).not.toBeNull();
  });

  it('takes over the value emitted by the custom element', async () => {
    const fixture = create(() => Promise.resolve({}));
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement.querySelector('rating-stars-element');
    element.dispatchEvent(new CustomEvent('valueChange', { detail: 4 }));

    expect(fixture.componentInstance.value()).toBe(4);
  });

  it('shows a hint when the remote cannot be loaded', async () => {
    const fixture = create(() => Promise.reject(new Error('remote is down')));
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('currently not available');
  });
});
