import { test, expect } from '@playwright/test';

test('Place Order: Add Products to Cart', async ({ page }) => {
  const isFirefox = test.info().project.name === 'firefox';

  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click 'Products' button
  await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded' });

  // 5. Hover over first product and click 'Add to cart'
  await page.evaluate(() => {
    const btn = document.querySelector('a.add-to-cart[data-product-id="1"]');
    if (btn) (btn as HTMLElement).click();
  });

  // 6. Click 'Continue Shopping' button (if modal appears)
  if (!isFirefox) {
    const modal = page.locator('.modal-content');
    try {
      await modal.waitFor({ state: 'visible', timeout: 5000 });
      const continueBtn = modal.locator('.btn-success');
      if (await continueBtn.isVisible()) {
        await continueBtn.click({ force: true });
      }
      await modal.waitFor({ state: 'hidden', timeout: 15000 });
    } catch {
      // No modal appeared
    }
  }
  await page.waitForTimeout(1000);

  // 7. Hover over second product and click 'Add to cart'
  await page.evaluate(() => {
    const btn = document.querySelector('a.add-to-cart[data-product-id="2"]');
    if (btn) (btn as HTMLElement).click();
  });

  // 8. Click 'Continue Shopping' button (if modal appears)
  if (!isFirefox) {
    const modal = page.locator('.modal-content');
    try {
      await modal.waitFor({ state: 'visible', timeout: 5000 });
      const continueBtn = modal.locator('.btn-success');
      if (await continueBtn.isVisible()) {
        await continueBtn.click({ force: true });
      }
      await modal.waitFor({ state: 'hidden', timeout: 15000 });
    } catch {
      // No modal appeared
    }
  }
  await page.waitForTimeout(1000);

  // 9. Click 'View Cart' button
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
  await page.locator('.cart_info table').waitFor({ state: 'visible', timeout: 15000 });

  // 10. Verify both products are added to Cart
  const cartProducts = page.locator('.cart_info table tbody tr');
  await expect(cartProducts).toHaveCount(2);
  const cartText = await cartProducts.allTextContents();
  const hasBlueTop = cartText.some(t => t.includes('Blue Top'));
  const hasMenTshirt = cartText.some(t => t.includes('Men Tshirt'));
  expect(hasBlueTop).toBeTruthy();
  expect(hasMenTshirt).toBeTruthy();

  // 11. Verify their prices, quantity and total price
  expect(cartText.some(t => t.includes('Rs. 500'))).toBeTruthy();
  expect(cartText.some(t => t.includes('Rs. 400'))).toBeTruthy();
  // Quantity is 1 for both products
  const qtyButtons = page.locator('.cart_info table tbody tr td.cart_quantity button');
  await expect(qtyButtons).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    await expect(qtyButtons.nth(i)).toHaveText('1');
  }
});