import { test, expect } from '@playwright/test';

test('Login User with correct email and password', async ({ page }) => {
  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  // 6. Enter incorrect email address and password
  await page.fill('input[data-qa="login-email"]', 'incorrect@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrongPassword123');

  // 7. Click 'login' button
  await page.click('button[data-qa="login-button"]');

  // 8.  Verify error 'Your email or password is incorrect!' is visible
 await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();
  })