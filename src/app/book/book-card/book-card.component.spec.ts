import { expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { BookCardComponent } from './book-card.component';

describe(BookCardComponent.name, () => {
  it('should render "n/a when no book is provided"', async () => {
    const { locator } = await render(BookCardComponent, {
      withRouting: {
        routes: [
          {
            path: 'books',
            component: BookCardComponent
          }
        ],

        initialRoute: '/books',
        disableInputBinding: true
      }
    });

    await expect.element(locator.getByTestId('book-title')).toBeVisible();
    await expect.element(locator.getByTestId('book-title')).toHaveTextContent('n/a');
  });
});
