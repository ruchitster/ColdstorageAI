import { test, expect } from '@playwright/test';

test('login failure flow', async ({ page }) => {

  await page.goto('/');

  await expect(page.getByTestId('login-username')).toBeVisible();

  await page.getByTestId('login-username').fill('wronguser');
  await page.getByTestId('login-password').fill('wrongpass');

  // IMPORTANT: wait for API response
  await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/auth/login')
    ),
    page.getByTestId('login-submit').click()
  ]);

  // UI update needs time
  await expect(page.getByTestId('login-error')).toBeVisible({
    timeout: 10000
  });

  await expect(page).toHaveURL(/login|\/$/);
});