import { test, expect } from "@playwright/test";

test("protected route redirects unauthenticated user", async ({ page }) => {

  // Ensure no auth exists
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("token");
    sessionStorage.clear();
  });

  // Try accessing dashboard directly
  await page.goto("/dashboard");

  // Should redirect to login
  await expect(page).toHaveURL(/\/$/);

  // Login page should be visible
  await expect(
    page.getByTestId("login-submit")
  ).toBeVisible();

});