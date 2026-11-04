import{ test, expect} from '@playwright/test';

test('Existing User', async({page})=>{

  // 1 & 2. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully 
  await expect(page.locator('.logo.pull-left')).toBeVisible();

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator('h2:has-text("New User Signup!")')).toBeVisible();

  // 6. Enter name and already registered email address
  await page.fill(('//input[@data-qa="signup-name"]'), 'Jacque');
  await page.fill('//input[@data-qa="signup-email"]', "Jacque@example.com");

  //7. Click 'Signup' button
  await page.click('//button[@data-qa="signup-button"]')

  //8. Verify error 'Email Address already exist!' is visible
  await expect(page.locator('p:has-text("Email Address already exist!")')).toBeVisible();
})
