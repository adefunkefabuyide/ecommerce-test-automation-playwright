import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly loggedInAsIndicator: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.logo.pull-left');
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.loggedInAsIndicator = page.locator('a:has-text("Logged in as")');
    this.deleteAccountLink = page.locator('a:has-text("Delete Account")');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async verifyHomePageVisible() {
    await expect(this.logo).toBeVisible();
  }

  async goToLogin() {
    await this.signupLoginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async verifyLoggedInAs() {
    await expect(this.loggedInAsIndicator).toBeVisible();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
