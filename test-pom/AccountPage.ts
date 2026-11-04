import { type Page, type Locator, expect } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly loggedInAsLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loggedInAsLink = page.locator('a:has-text("Logged in as")');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a:has-text("Delete Account")');
    this.accountDeletedHeading = page.locator('h2:has-text("Account Deleted!")');
  }

  async verifyLoggedIn() {
    await expect(this.loggedInAsLink).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
    await expect(this.accountDeletedHeading).toBeVisible();
  }
}