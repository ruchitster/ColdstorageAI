import { test, expect } from '@playwright/test';

test('REAL login flow', async ({ page }) => {
  await page.goto('/login');

  const username = page.getByTestId('login-username');
  const password = page.getByTestId('login-password');
  const submit = page.getByTestId('login-submit');

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  await username.fill('admin');
  await password.fill('admin123');

  await submit.click();

  // ✅ stable assertion (NO network dependency)
  await expect(page).toHaveURL(/dashboard/);
});