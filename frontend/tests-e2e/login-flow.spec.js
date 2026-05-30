import { test, expect } from '@playwright/test';

test('REAL login flow', async ({ page }) => {

  // ✅ FIX: go to correct route
  await page.goto('http://localhost:5173/');

  // wait for login UI
  const username = page.getByTestId('login-username');

  await expect(username).toBeVisible();

  await page.getByTestId('login-password').fill('admin123');
  await username.fill('admin');

  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/auth/login')
    ),
    page.getByTestId('login-submit').click()
  ]);

  expect(response.ok()).toBeTruthy();

  // IMPORTANT: only works if PrivateRoute redirects after login
  await expect(page).toHaveURL(/dashboard/);
});