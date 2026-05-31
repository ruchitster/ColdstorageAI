import { test, expect } from '@playwright/test';

test('REAL login flow', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('admin123');

  await page.getByTestId('login-submit').click();

  await page.waitForTimeout(3000);

  console.log('CURRENT URL:', page.url());

  const error = page.getByTestId('login-error');

  if (await error.count()) {
    console.log('LOGIN ERROR:', await error.textContent());
    console.log('CURRENT URL:', page.url());
  }

  await expect(page).toHaveURL(/dashboard/);
});