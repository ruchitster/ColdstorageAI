import { test, expect } from "@playwright/test";

test("dashboard loads correctly after login", async ({ page }) => {

  // =========================
  // 1. Login
  // =========================
  await page.goto("/");

  await page.getByTestId("login-username").fill("admin");
  await page.getByTestId("login-password").fill("admin123");

  await page.getByTestId("login-submit").click();

  // Wait for dashboard
  await expect(page).toHaveURL(/dashboard/, {
    timeout: 10000,
  });

  // =========================
  // 2. Core dashboard UI checks
  // =========================

  // Sidebar visible
  await expect(
    page.getByTestId("sidebar-logo")
  ).toBeVisible();

  // Navigation items exist
  await expect(
    page.getByTestId("nav-dashboard")
  ).toBeVisible();

  await expect(
    page.getByTestId("nav-inward-report")
  ).toBeVisible();

  await expect(
    page.getByTestId("nav-outward-report")
  ).toBeVisible();

  await expect(
    page.getByTestId("nav-product-stock")
  ).toBeVisible();

});