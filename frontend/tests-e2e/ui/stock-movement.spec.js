import { test, expect } from "@playwright/test";

test("stock movement report loads correctly", async ({ page }) => {

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
  // 2. Navigate to Stock Movement
  // =========================
  await page.getByTestId("nav-stock-movement").click();

  await expect(page).toHaveURL(/inward-stock-movement/);

  // =========================
  // 3. Wait for loading to complete (if exists)
  // =========================
  const loading = page.locator("text=Loading");

  if (await loading.count() > 0) {
    await expect(loading.first()).toBeHidden({ timeout: 10000 });
  }

  // =========================
  // 4. Validate table renders
  // =========================
  const tableRows = page.locator("table tbody tr");

  await expect(tableRows.first()).toBeVisible();

  expect(await tableRows.count()).toBeGreaterThan(0);

  // =========================
  // 5. Basic filter UI sanity check (safe)
  // =========================
  const inputs = page.locator("input");

  if (await inputs.count() > 0) {
    await expect(inputs.first()).toBeVisible();
  }

});