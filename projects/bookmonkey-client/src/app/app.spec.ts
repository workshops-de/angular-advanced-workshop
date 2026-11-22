import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('greets the attendee', async () => {
    await render(App);

    expect(screen.getByText(/Hello, Angularian/)).toBeInTheDocument();
  });
});
