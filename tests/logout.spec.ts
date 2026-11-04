import { test, expect } from '@playwright/test';

test('Logout User', async ({ page }) => {

  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  // 6. Enter correct email address and password
  await page.fill('input[data-qa="login-email"]', 'Jacque@example.com');
  await page.fill('input[data-qa="login-password"]', '1234');

  // 7. Click 'login' button
  await page.click('button[data-qa="login-button"]');

  // 8. Verify that 'Logged in as username' is visible
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

  // 9. Click 'Logout' button
  await page.click('a[href="/logout"]');

  // 10. Verify that user is navigated to login page
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
  await expect(page).toHaveURL('/login');
});