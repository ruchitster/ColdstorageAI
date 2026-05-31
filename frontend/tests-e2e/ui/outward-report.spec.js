import { test, expect } from "@playwright/test";

test("outward report loads data correctly", async ({ page }) => {

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
  // 2. Navigate to Outward Report
  // =========================
  await page.getByTestId("nav-outward-report").click();

  await expect(page).toHaveURL(/outward/);

  // =========================
  // 3. Wait for loading to disappear (IMPORTANT FIX)
  // =========================
  await expect(
    page.getByTestId("report-loading")
  ).toBeVisible();

  await expect(
    page.getByTestId("report-loading")
  ).toBeHidden({ timeout: 10000 });

  // =========================
  // 4. Validate table data
  // =========================
  const tableRows = page.locator("table tbody tr");

  await expect(tableRows.first()).toBeVisible();

  expect(await tableRows.count()).toBeGreaterThan(0);

});