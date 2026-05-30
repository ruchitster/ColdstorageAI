import { test, expect } from '@playwright/test';

test('login page works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const username = page.getByTestId('login-username');
  const password = page.getByTestId('login-password');
  const submit = page.getByTestId('login-submit');

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  await username.fill('admin');
  await password.fill('admin123');

  await submit.click();
});