import { test, expect } from '@playwright/test';

// Läuft gegen die echte Bookmonkey API auf http://localhost:4730 (`npx bookmonkey-api`).
test.describe('Books core path', () => {
  test('search for a book and open its detail page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Books', exact: true }).click();
    await expect(page).toHaveURL(/\/books$/);

    await page.getByRole('searchbox').fill('Hobbit');

    const hits = page.getByRole('heading', { level: 3, name: /Hobbit/ });
    await expect(hits.first()).toBeVisible();

    await page.getByRole('link', { name: 'More' }).first().click();

    await expect(page).toHaveURL(/\/books\/detail\/\d+/);
    await expect(page.getByRole('heading', { level: 1, name: /Hobbit/ })).toBeVisible();
  });
});
