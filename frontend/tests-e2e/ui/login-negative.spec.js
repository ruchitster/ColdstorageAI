import { test, expect } from '@playwright/test';

test('login failure flow', async ({ page }) => {
  await page.goto('/login');

  const username = page.getByTestId('login-username');
  const password = page.getByTestId('login-password');
  const submit = page.getByTestId('login-submit');

  await expect(username).toBeVisible();

  await username.fill('wronguser');
  await password.fill('wrongpass');

  await submit.click();

  // ✅ stable UI assertion
  await expect(page.getByTestId('login-error')).toBeVisible();

  // ensure still on login page
  await expect(page).toHaveURL(/login/);
});