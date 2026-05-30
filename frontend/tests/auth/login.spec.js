import { test, expect } from '@playwright/test';

test('invalid login shows error alert / stays on login', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('login-username').fill('wrong');
  await page.getByTestId('login-password').fill('wrong');
  await page.getByTestId('login-submit').click();

  // Current app uses alert(...) on invalid credentials.
  // We assert we are still on login page by locating the submit button.
  await expect(page.getByTestId('login-submit')).toBeVisible();
});






