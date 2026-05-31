import { test, expect } from "@playwright/test";

test("inward report loads data correctly", async ({ page }) => {

  // =========================
  // 1. Login
  // =========================
  await page.goto("/");

  await page.getByTestId("login-username").fill("admin");
  await page.getByTestId("login-password").fill("admin123");

  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/dashboard/, {
    timeout: 10000,
  });

  // =========================
  // 2. Navigate to Inward Report
  // =========================
  await page.getByTestId("nav-inward-report").click();

  await expect(page).toHaveURL(/inward/);

  // =========================
  // 3. Validate page loads
  // =========================
  await expect(page.getByText(/inward/i)).toBeVisible();

  // =========================
  // 4. Validate table data (FIXED)
  // =========================
  const tableRows = page.locator("table tbody tr");

  // Ensure table is rendered
  await expect(tableRows.first()).toBeVisible();

  // Ensure there is actual data
  expect(await tableRows.count()).toBeGreaterThan(0);

});