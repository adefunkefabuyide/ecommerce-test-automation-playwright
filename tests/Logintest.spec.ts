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

  // Register a new account (needed because no pre-existing credentials exist)
  const email = `testuser${Date.now()}@example.com`;
  await page.fill('input[data-qa="signup-name"]', 'Test User');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');

  // Fill registration form
  await page.fill('input[data-qa="password"]', 'YourPassword123');
  await page.fill('input[data-qa="first_name"]', 'Test');
  await page.fill('input[data-qa="last_name"]', 'User');
  await page.fill('input[data-qa="address"]', '123 Test Street');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="city"]', 'Test City');
  await page.fill('input[data-qa="state"]', 'Test State');
  await page.fill('input[data-qa="zipcode"]', '12345');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');
  await page.click('button[data-qa="create-account"]');
  await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible();
  await page.click('a:has-text("Continue")');

  // 6. Log out, then log in with the new credentials
  await page.click('a[href="/logout"]');
  await page.click('a[href="/login"]');
  await page.waitForSelector('h2:has-text("Login to your account")', { state: 'visible', timeout: 15000 });

  // 7. Enter correct email address and password
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', 'YourPassword123');

  // 7. Click 'login' button
  await page.click('button[data-qa="login-button"]');
  await page.waitForSelector('a:has-text("Logged in as")', { state: 'visible', timeout: 15000 });

  // 8. Verify that 'Logged in as username' is visible
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

  // 9. Click 'Delete Account' button
  await page.waitForSelector('a:has-text("Delete Account")', { state: 'visible', timeout: 15000 });
  await page.click('a:has-text("Delete Account")');
  await expect(page.locator('h2:has-text("Account Deleted!")')).toBeVisible();
});