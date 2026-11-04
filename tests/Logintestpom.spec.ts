import { test, expect } from '@playwright/test';
import { SignupPage, AccountDetails } from '../test-pom/Logintest';
import { HomePage } from '../test-pom/HomePage';
import { LoginPage } from '../test-pom/LoginPage';

test('Login User with correct email and password using POM', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);

  // 1 & 2. Launch browser and navigate to url
  await homePage.goto();

  // 3. Verify that home page is visible successfully
  await homePage.verifyHomePageVisible();

  // 4. Click on 'Signup / Login' button
  await homePage.goToLogin();

  // 5. Verify 'Login to your account' is visible
  await loginPage.verifyLoginPageVisible();

  // Register a new account (needed because no pre-existing credentials exist)
  const email = `testuser${Date.now()}@example.com`;
  await loginPage.signup('Test User', email);

  // Fill registration form
  const accountDetails: AccountDetails = {
    password: 'YourPassword123',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test Street',
    country: 'United States',
    city: 'Test City',
    state: 'Test State',
    zipcode: '12345',
    mobileNumber: '1234567890'
  };

  await signupPage.fillAccountDetails(accountDetails);
  await signupPage.submitAccountCreation();
  await signupPage.verifyAccountCreated();
  await signupPage.clickContinue();

  // 6. Log out, then log in with the new credentials
  await homePage.logout();
  await homePage.goToLogin();
  await loginPage.verifyLoginPageVisible();

  // 7. Enter correct email address and password
  await loginPage.login(email, 'YourPassword123');

  // 8. Verify that 'Logged in as username' is visible
  await homePage.verifyLoggedInAs();

  // 9. Click 'Delete Account' button (optional cleanup step, comment out if not needed)
  // await homePage.deleteAccount();
});