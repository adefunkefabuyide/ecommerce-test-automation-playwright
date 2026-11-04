import {test, expect } from '@playwright/test';
test("contact form", async({page})=>{
    // the page asks for a confirmation before it "submits" the form
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Press OK');
        await dialog.accept();
    });

    await page.goto('https://automationexercise.com');
    await expect(page.locator('//img[@src="/static/images/home/logo.png"]')).toBeVisible();
    await page.locator('//a[@href="/contact_us"]').click();

    // the submit handler is an inline script at the end of <body>, so it only
    // exists once every blocking third-party script has finished loading
    await page.waitForLoadState('load');
    await expect(page.locator('h2:has-text("Get In Touch")')).toBeVisible();

    await page.locator('//input[@data-qa="name"]').fill("James Tally");
    await page.locator('//input[@data-qa="email"]').fill("James@example.com");
    await page.locator('//input[@data-qa="subject"]').fill("Enquiry");
    await page.locator("#message").fill("I would like to make an inquiry");
    await page.locator('//input[@name="upload_file"]').setInputFiles('sample-upload.txt');
    await page.locator('//input[@name="submit"]').click();

    await expect(page.locator('.status.alert-success'))
        .toHaveText('Success! Your details have been submitted successfully.');
})