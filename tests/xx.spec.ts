import { test, expect } from '@playwright/test';

test('Contact Form', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');

    await page.locator('[data-qa="name"]').fill('Toppy');
    await page.locator('[data-qa="email"]').fill('toppy@test.com');
    await page.locator('[data-qa="subject"]').fill('Automation');
    await page.locator('[data-qa="message"]').fill('Playwright Test');

    await page.locator('input[name="upload_file"]').setInputFiles('./sample-upload.txt');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Press OK');
        await dialog.accept();
    });

    await page.locator('input[name="submit"]').click();

    await expect(page.locator('.status.alert-success'))
        .toBeVisible({ timeout: 15000 });

    await expect(page.locator('.status.alert-success'))
        .toContainText('Success! Your details have been submitted successfully.');
});
