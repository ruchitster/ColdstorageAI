import { test, expect } from "@playwright/test";

test("FULL SMOKE: end-to-end ERP flow", async ({ page }) => {

  // =========================
  // 1. LOGIN
  // =========================
  await page.goto("/");

  await page.getByTestId("login-username").fill("admin");
  await page.getByTestId("login-password").fill("admin123");

  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/dashboard/, {
    timeout: 15000,
  });

  await expect(page.getByTestId("sidebar-logo")).toBeVisible();

  // =========================
  // 2. INWARD REPORT
  // =========================
  await page.getByTestId("nav-inward-report").click();
  await expect(page).toHaveURL(/inward/);

  const inwardRows = page.locator("table tbody tr");
  await expect(inwardRows.first()).toBeVisible();
  expect(await inwardRows.count()).toBeGreaterThan(0);

  // =========================
  // 3. OUTWARD REPORT
  // =========================
  await page.getByTestId("nav-outward-report").click();
  await expect(page).toHaveURL(/outward/);

  const outwardRows = page.locator("table tbody tr");
  await expect(outwardRows.first()).toBeVisible();
  expect(await outwardRows.count()).toBeGreaterThan(0);

  // =========================
  // 4. STOCK MOVEMENT
  // =========================
  await page.getByTestId("nav-stock-movement").click();
  await expect(page).toHaveURL(/inward-stock-movement/);

  const stockMoveRows = page.locator("table tbody tr");
  await expect(stockMoveRows.first()).toBeVisible();
  expect(await stockMoveRows.count()).toBeGreaterThan(0);

  // =========================
  // 5. PRODUCT STOCK
  // =========================
  await page.getByTestId("nav-product-stock").click();
  await expect(page).toHaveURL(/stock/);

  const stockRows = page.locator("table tbody tr");
  await expect(stockRows.first()).toBeVisible();
  expect(await stockRows.count()).toBeGreaterThan(0);

  const title = page.getByTestId("report-title");
  await expect(title).toBeVisible();

  // =========================
  // 6. LOGOUT
  // =========================
  await page.getByTestId("logout-button").click();

  await expect(page).toHaveURL(/\/$/);

  const token = await page.evaluate(() =>
    localStorage.getItem("token")
  );

  expect(token).toBeNull();

});