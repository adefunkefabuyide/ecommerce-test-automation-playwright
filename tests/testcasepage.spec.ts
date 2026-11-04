import { test, expect } from '@playwright/test';

test('Verify Test Cases Page', async ({ page }) => {
  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Test Cases' button
  await page.locator('.shop-menu a[href="/test_cases"]').click();

  // 5. Verify user is navigated to test cases page successfully
  await expect(page).toHaveURL(/\/test_cases/)
  await expect(page.locator('b:has-text("Test Cases")')).toBeVisible();
});