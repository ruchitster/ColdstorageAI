import { test, expect } from '@playwright/test';

test('login failure flow', async ({ page }) => {
  await page.goto('/');

  const username = page.getByTestId('login-username');
  const password = page.getByTestId('login-password');
  const submit = page.getByTestId('login-submit');

  await expect(username).toBeVisible();

  await username.fill('wronguser');
  await password.fill('wrongpass');

  await submit.click();

  // Error message should appear
  await expect(
    page.getByTestId('login-error')
  ).toBeVisible();

  // User should remain on login page
  await expect(page).toHaveURL(/\/$/);
});