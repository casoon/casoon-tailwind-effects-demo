import { test, expect } from '@playwright/test';

const routes = [
  '/docs',
  '/docs/getting-started',
  '/docs/conventions',
  '/docs/glass',
  '/docs/orbs',
  '/docs/gradients',
  '/docs/templates',
  '/docs/guides',
  '/docs/guides/orbs-glass-hero',
  '/docs/guides/theming-tokens',
];

for (const path of routes) {
  test(`page loads: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
  });
}

