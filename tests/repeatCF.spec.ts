const { test, expect } = require('@playwright/test');

test('Contact Us form submission', async ({ page }) => {
  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Contact Us' button
  await page.click('a[href="/contact_us"]');

  // 5. Verify 'GET IN TOUCH' is visible
  await expect(page.locator('h2:has-text("Get In Touch")')).toBeVisible();

  // The submit handler is an inline script at the end of <body>, so it only
  // exists once every blocking third-party script has finished loading.
  // Clicking Submit before this point causes a real form POST instead.
  await page.waitForLoadState('load');

  // 6. Enter name, email, subject and message
  await page.fill('input[data-qa="name"]', 'John Doe');
  await page.fill('input[data-qa="email"]', 'johndoe@example.com');
  await page.fill('input[data-qa="subject"]', 'Test Subject');
  await page.fill('textarea[data-qa="message"]', 'This is a test message for the contact us form.');

  // 7. Upload file
  await page.setInputFiles('input[name="upload_file"]', 'C:\\Users\\FK\\OneDrive\\Desktop\\Playwright\\sample-upload.txt');

  // 8 & 9. Click 'Submit' button and accept the confirm dialog (OK button)
  // NOTE: the page's submit handler always returns false (confirmed from source),
  // so there is NO real form submission or page navigation/reload. Accepting the
  // dialog just lets the handler's jQuery code run, which unhides the success
  // message and replaces #form-section's contents with a Home link, in place.
  page.once('dialog', (dialog) => dialog.accept());
  await page.click('input[data-qa="submit-button"]');

  // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
  const successMessage = page.locator('.status.alert-success');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText(
    'Success! Your details have been submitted successfully.'
  );

  // 11. Click 'Home' button and verify that landed to home page successfully
  // The Home link only exists inside #form-section after the success update, so scope to it.
  await page.click('#form-section a.btn.btn-success');
  await expect(page).toHaveURL('https://automationexercise.com/');
  await expect(page.locator('.logo.pull-left')).toBeVisible();
});