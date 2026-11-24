import { test, expect } from '@playwright/test';

test('loads the start page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Books', exact: true })).toBeVisible();
});
