import { type Page, type Locator } from "@playwright/test";
export default class loginPage {
	readonly email: Locator;
	readonly password: Locator;
	readonly loginButton: Locator;
	readonly signUp: Locator;
	constructor(public page: Page) {
		this.page = page;
		this.email = page.locator("#email");
		this.password = page.locator("#password");
		this.loginButton = page.locator("#login-submit-button");
		this.signUp = page.locator("a[href$='signup']");
	}

	async inputForm(emailValue: string, passwordValue: string) {
		await this.email.fill(emailValue);
		await this.password.fill(passwordValue);
	}

	async pressLoginButton() {
		await this.loginButton.click();
	}

	async pressRegisterButton() {
		await this.signUp.click();
	}
}
