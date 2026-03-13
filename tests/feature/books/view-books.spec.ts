import { expect, test } from '@playwright/test';

test(`When the list of books is opened, it displays at least one book`, async ({ page }) => {
  await page.goto('/books');

  const bookCard = page.getByTestId('book-card');

  await expect(bookCard.first()).toBeVisible();
});
