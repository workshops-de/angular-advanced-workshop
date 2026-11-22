import { TestBed } from '@angular/core/testing';
import { Rating } from './rating';

describe('Rating', () => {
  function setup(readonly = false) {
    const fixture = TestBed.createComponent(Rating);
    fixture.componentRef.setInput('readonly', readonly);
    fixture.detectChanges();
    const stars = () =>
      Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    return { fixture, stars };
  }

  it('renders 5 stars', () => {
    expect(setup().stars().length).toBe(5);
  });

  it('sets the rating on click and resets on second click', () => {
    const { fixture, stars } = setup();
    stars()[2].click();
    expect(fixture.componentInstance.value()).toBe(3);
    stars()[2].click();
    expect(fixture.componentInstance.value()).toBe(0);
  });

  it('does not change in readonly mode', () => {
    const { fixture, stars } = setup(true);
    stars()[2].click();
    expect(fixture.componentInstance.value()).toBe(0);
  });
});
