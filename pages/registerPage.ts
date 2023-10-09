import { type Page, type Locator } from "@playwright/test";
export default class registerPage {
	readonly formControlName: Locator;
	readonly formControlSurname: Locator;
	readonly formControlEmail: Locator;
	readonly formControlPassword: Locator;
	readonly signUpButton: Locator;

	constructor(public page: Page) {
		this.page = page;
		this.formControlName = page.locator("#first-name");
		this.formControlSurname = page.locator("#last-name");
		this.formControlEmail = page.locator("#email");
		this.formControlPassword = page.locator("#password");
		this.signUpButton = page.locator("#signup-submit-button");
	}
	async inputForm(name: string, surname: string, email: string, password: string) {
		await this.formControlName.fill(name);
		await this.formControlSurname.fill(surname);
		await this.formControlEmail.fill(email);
		await this.formControlPassword.fill(password);
	}

	async pressRegisterButton() {
		await this.signUpButton.click();
	}
	// 	const signUpButton = await page.$("#signup-submit-button");
	// 	await signUpButton!.click();
}
