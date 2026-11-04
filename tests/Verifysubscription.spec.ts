import {test, expect} from '@playwright/test'

test("verify subscription in home page", async({page})=>{
    // 1 & 2. Launch browser and navigate to url
    await page.goto('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    await expect(page.locator('.logo.pull-left')).toBeVisible();

    // 4. Scroll down to footer
    await page.locator('#footer').scrollIntoViewIfNeeded();

    // 5.  Verify text 'SUBSCRIPTION'
    await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
    
    // 6. Enter email address in input and click arrow button
    await page.fill('#susbscribe_email', 'Jacque@example.com');
    await page.click('#susbscribe_email');

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    await expect(page.locator('#success-subscribe .alert-success')).toContainText('You have been successfully subscribed!');
});