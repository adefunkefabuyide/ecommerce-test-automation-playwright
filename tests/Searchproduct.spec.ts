import{ test, expect} from '@playwright/test'

test('search products', async ({page})=> {
    // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Products' button
  await page.click('//a[@href="/products"]');

  //5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();

  //6. . Enter product name in search input and click search button
  await page.fill('#search_product', 'stylish dress');
  await page.click('#submit_search');

  //7.  Verify 'SEARCHED PRODUCTS' is visible
  await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();
  
  //8.  Verify all the products related to search are visible
  await expect(page.locator('.features_items .single-products')).toBeVisible();


})