import { test, expect } from "@playwright/test";

test("product stock report loads correctly", async ({ page }) => {

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
  // 2. Navigate to Product Stock
  // =========================
  await page.getByTestId("nav-product-stock").click();

  await expect(page).toHaveURL(/stock/);

  // =========================
  // 3. Wait for loading (safe check)
  // =========================
  const loading = page.locator("text=Loading");

  if (await loading.count() > 0) {
    await expect(loading.first()).toBeHidden({ timeout: 10000 });
  }

  // =========================
  // 4. Validate table exists
  // =========================
  const tableRows = page.locator("table tbody tr");

  await expect(tableRows.first()).toBeVisible();

  expect(await tableRows.count()).toBeGreaterThan(0);

  // =========================
  // 5. FIXED: Avoid strict-mode violation
  // =========================
  const title = page.getByTestId("report-title");

  await expect(title).toBeVisible();
  await expect(title).toContainText("Stock");

});