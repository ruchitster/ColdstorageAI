import { test, expect } from "@playwright/test";

test("logout flow", async ({ page }) => {
  await page.goto("/");

  // Login
  await page.getByTestId("login-username").fill("admin");
  await page.getByTestId("login-password").fill("admin123");
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/dashboard/);

  // Ensure dashboard loaded
  await expect(page.getByTestId("sidebar-logo")).toBeVisible();

  // Token exists
  const tokenBefore = await page.evaluate(() =>
    localStorage.getItem("token")
  );
  expect(tokenBefore).toBeTruthy();

  // Logout
  await page.getByTestId("logout-button").click();

  // 🔥 CI-safe assertion (login route OR root)
  await expect(page).toHaveURL(/\/$/);

  // Token removed
  const tokenAfter = await page.evaluate(() =>
    localStorage.getItem("token")
  );
  expect(tokenAfter).toBeNull();

  // Try protected route
  await page.goto("/dashboard");

  await expect(page).toHaveURL(/\/$/);

  await expect(page.getByTestId("login-submit")).toBeVisible();
});