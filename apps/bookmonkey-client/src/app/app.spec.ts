import { provideRouter } from '@angular/router';
import { render } from 'vitest-browser-angular';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('greets the attendee', async () => {
    const screen = await render(App, { providers: [provideRouter([])] });

    await vi.advanceTimersByTimeAsync(6000);

    await expect.element(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello Angularian');
  });
});
