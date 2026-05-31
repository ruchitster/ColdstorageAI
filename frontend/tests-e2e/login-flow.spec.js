import { test, expect } from '@playwright/test';

test('REAL login flow', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('admin123');

  const responsePromise = page.waitForResponse(
    res => res.url().includes('/auth/login')
  );

  await page.getByTestId('login-submit').click();

  const response = await responsePromise;

  console.log('LOGIN STATUS:', response.status());
  console.log('LOGIN BODY:', await response.text());

  await expect(page).toHaveURL(/dashboard/);
});