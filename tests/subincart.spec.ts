import{test,expect} from '@playwright/test'

test ('Verify Subscription in Cart', async ({page})=>{

    // 1 & 2. Launch browser and navigate to url
    await page.goto('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    await expect(page.locator('.logo.pull-left')).toBeVisible();

    //4. Click 'Cart' button
    await page. click ('//a[@href="/view_cart"]');
    
     // 5. Scroll down to footer
    await page.locator('#footer').scrollIntoViewIfNeeded();

    // 6.  Verify text 'SUBSCRIPTION'
    await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();
    
    // 7. Enter email address in input and click arrow button
    await page.fill('#susbscribe_email', 'Jacque@example.com');
    await page.click('#susbscribe_email');

    // 8. Verify success message 'You have been successfully subscribed!' is visible
    await expect(page.locator('#success-subscribe .alert-success')).toContainText('You have been successfully subscribed!');
});
