import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('greets the attendee', async () => {
    const { fixture } = await render(App);

    await vi.advanceTimersByTimeAsync(6000);
    fixture.detectChanges();

    expect(screen.getByText(/Hello Angularian/)).toBeInTheDocument();
  });
});
