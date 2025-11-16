
const { test, expect } = require('@playwright/test');

test('SauceDemo login, add product, verify cart, logout', async ({ page }) => {
  // Navigate to SauceDemo login page
  await page.goto('https://www.saucedemo.com/');

  // Login with valid credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Add the first product to cart and store its name
  const firstProduct = page.locator('.inventory_item_name').first();
  const firstProductName = await firstProduct.textContent();
  await page.locator('button[data-test^="add-to-cart"]').first().click();

  // Go to the cart page
  await page.click('.shopping_cart_link');

  // Verify product name in cart matches the added product
  const cartProductName = await page.locator('.inventory_item_name').textContent();
  expect(cartProductName).toBe(firstProductName);

  // Open menu and logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
});
