import { test, expect } from '@playwright/test';

test('REAL login flow', async ({ page }) => {
  await page.goto('/login');


console.log(await page.content());
console.log('URL:', page.url());
console.log('TITLE:', await page.title());


  await page.waitForLoadState('networkidle');

  const username = page.getByTestId('login-username');
  const password = page.getByTestId('login-password');
  const submit = page.getByTestId('login-submit');

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  await username.fill('admin');
  await password.fill('admin123');

  await submit.click();

  await expect(page).toHaveURL(/dashboard/);
});