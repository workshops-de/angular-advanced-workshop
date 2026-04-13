import { expect, test } from '@playwright/test';
import { BooksPOM } from './books.pom';

test('When a search matches a book title', async ({ page }) => {
  const pom = new BooksPOM(page);

  await pom.gotoPage('search');
  await pom.search('Angular');
  await pom.ensureOneBook();
  await pom.clearSearch();
  await pom.ensureNoSearchResults();
});

test('screenshot', async ({ page }) => {
  const pom = new BooksPOM(page);

  await pom.gotoPage('search');

  await expect(page.getByTestId('book-search-submit')).toHaveScreenshot();
});
