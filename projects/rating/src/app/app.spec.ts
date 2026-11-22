import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('should render the rating demo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Rating');
    expect(el.querySelectorAll('rating-stars button').length).toBe(5);
  });
});
