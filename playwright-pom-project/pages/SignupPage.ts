import { type Page, type Locator, expect } from '@playwright/test';

export interface AccountDetails {
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  mobileNumber: string;
}

export class SignupPage {
  readonly page: Page;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedHeading = page.locator('h2:has-text("Account Created!")');
    this.continueButton = page.locator('a:has-text("Continue")');
  }

  async fillAccountDetails(details: AccountDetails) {
    await this.passwordInput.fill(details.password);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.countrySelect.selectOption(details.country);
    await this.cityInput.fill(details.city);
    await this.stateInput.fill(details.state);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
  }

  async submitAccountCreation() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
