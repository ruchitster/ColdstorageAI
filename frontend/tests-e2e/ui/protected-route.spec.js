import { test, expect } from "@playwright/test";

test("protected route redirects unauthenticated user", async ({ page }) => {
  await page.goto("/dashboard");

  // Should redirect to login
  await expect(page).toHaveURL(/\/$/);

  // Login page visible
  await expect(page.getByTestId("login-submit")).toBeVisible();
});