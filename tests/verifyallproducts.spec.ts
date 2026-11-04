import { test, expect } from '@playwright/test';

test('Verify All Products and product detail page', async ({ page }) => {
  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Products' button
  await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded' });

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();

  // 6. The products list is visible
  await expect(page.locator('.features_items .single-products').first()).toBeVisible();

  // 7. Click on 'View Product' of first product
  await page.click('a[href="/product_details/1"]', { force: true });
  await page.waitForLoadState('domcontentloaded');

  // 8. User is landed to product detail page
  await expect(page).toHaveURL(/\/product_details\/1/);

  // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
  await expect(page.locator('.product-information h2:has-text("Blue Top")')).toBeVisible();
  await expect(page.locator('.product-information p:has-text("Category: Women > Tops")')).toBeVisible();
  const priceSpan = page.locator('.product-information span').filter({ hasText: /^Rs\. 500$/ }).first();
  await expect(priceSpan).toBeVisible();
  await expect(page.locator('.product-information p:has-text("Availability: In Stock")')).toBeVisible();
  await expect(page.locator('.product-information p:has-text("Condition: New")')).toBeVisible();
  await expect(page.locator('.product-information p:has-text("Brand: Polo")')).toBeVisible();
});