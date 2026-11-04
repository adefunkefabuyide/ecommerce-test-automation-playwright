import { test, expect } from '@playwright/test';
 
test('Verify Test Cases Page', async ({ page }) => {
  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');
 
  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();
 
  // 4. Click on 'Test Cases' button
  // Scoped to the header menu, since the home page also has a second 'Test Cases' button
  await page.locator('.shop-menu a[href="/test_cases"]').click();
 
  // 5. Verify user is navigated to test cases page successfully
  await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  await expect(page.locator('h2:has-text("Test Cases")').first()).toBeVisible();
});