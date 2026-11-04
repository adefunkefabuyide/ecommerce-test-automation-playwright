const { test, expect } = require('@playwright/test');
const path = require('path');

test('Contact Us form submission', async ({page})=> {
  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Contact Us' button
  await page.click('a[href="/contact_us"]');

  // 5. Verify 'GET IN TOUCH' is visible
  await expect(page.locator('h2:has-text("Get In Touch")')).toBeVisible();

  // 6. Enter name, email, subject and message
  await page.fill('input[data-qa="name"]', 'John Doe');
  await page.fill('input[data-qa="email"]', 'johndoe@example.com');
  await page.fill('input[data-qa="subject"]', 'Test Subject');
  await page.fill('textarea[data-qa="message"]', 'This is a test message for the contact us form.');

  // 7. Upload file
  await page.setInputFiles('input[name="upload_file"]', path.join('sample-upload.txt'));

  // 8. Click 'Submit' button
  // Handle the native confirm dialog that appears right after submit (step 9)
  page.once('dialog', async (dialog: { accept: () => any; }) => {
    await dialog.accept();
  });
  await page.click('input[data-qa="submit-button"]');

  // 10. Verify success message is visible
  await expect(page.locator('.status.alert-success')).toBeVisible();
  await expect(page.locator('.status.alert-success')).toHaveText(
    'Success! Your details have been submitted successfully.'
  );

  // 11. Click 'Home' button and verify landed on home page successfully
  await page.click('a.btn.btn-success[href="/"]');
  await expect(page.locator('.logo.pull-left')).toBeVisible();
  await expect(page).toHaveURL('https://automationexercise.com/');
});
