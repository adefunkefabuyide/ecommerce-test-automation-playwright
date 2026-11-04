import{test,expect} from '@playwright/test'

test('Add Products in Cart', async({page})=>{
    // 1 & 2. Launch browser and navigate to url
    await page.goto('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    await expect(page.locator('.logo.pull-left')).toBeVisible();

    // 4. Click on 'Products' button
    await page.click('//a[@href="/products"]');
    
    // 5. Hover over first product and click 'Add to cart'
const firstProduct = page.locator('.features_items .single-products').first();
await firstProduct.hover();
await firstProduct.locator('#cartModal').first().evaluate(el => el.click());

// 6. Click 'Continue Shopping' button (if modal appears)
const continueBtn = page.locator('.modal-content .btn-success');
if (await continueBtn.isVisible()) {
  await continueBtn.click({ force: true });
  await page.locator('.modal-content').waitFor({ state: 'hidden', timeout: 15000 });
}

// 7. Hover over second product and click 'Add to cart'
const secondProduct = page.locator('.features_items .single-products').nth(1);
await secondProduct.waitFor({ state: 'visible', timeout: 15000 });
await secondProduct.hover();
await secondProduct.locator('a.add-to-cart').first().evaluate(el => el.click());
})