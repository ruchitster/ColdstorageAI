import { test, expect } from '@playwright/test';

test('REAL login flow', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('admin123');

  await page.getByTestId('login-submit').click();

  // Wait for either dashboard or error message
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/dashboard/);
});