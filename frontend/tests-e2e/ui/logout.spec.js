import { test, expect } from "@playwright/test";

test("logout flow", async ({ page }) => {

  // Login page
  await page.goto("/");

  // Login
  await page.getByTestId("login-username").fill("admin");
  await page.getByTestId("login-password").fill("admin123");

  await page.getByTestId("login-submit").click();

  // Dashboard should load
  await expect(
    page.getByTestId("sidebar-logo")
  ).toBeVisible();

  // Token should exist
  const tokenBeforeLogout = await page.evaluate(() =>
    localStorage.getItem("token")
  );

  expect(tokenBeforeLogout).toBeTruthy();

  // Logout
  await page.getByTestId("logout-button").click();

  // Redirect to login page
  await expect(page).toHaveURL(/\/$/);

  // Token should be removed
  const tokenAfterLogout = await page.evaluate(() =>
    localStorage.getItem("token")
  );

  expect(tokenAfterLogout).toBeNull();

  // Try to access dashboard again
  await page.goto("/dashboard");

  // PrivateRoute should redirect to login
  await expect(page).toHaveURL(/\/$/);

  // Login form visible again
  await expect(
    page.getByTestId("login-submit")
  ).toBeVisible();

});