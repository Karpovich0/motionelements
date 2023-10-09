import { type Page, type Locator } from "@playwright/test";
export default class indexPage {
	readonly loginButton: Locator;
	readonly footerLanguageSelect: Locator;
	readonly searchInput: Locator;
	constructor(public page: Page) {
		this.page = page;
		this.loginButton = page.locator(".header .btn-simple-secondary");
		this.footerLanguageSelect = page.locator("footer select[name=language]");
		this.searchInput = page.locator("[data-qa=home-page-search-form] input");
	}
	async clickLogin() {
		await this.loginButton.click();
	}
	async scrollToSelect() {
		await this.footerLanguageSelect.scrollIntoViewIfNeeded();
	}
	async selectOption(option: string) {
		await this.footerLanguageSelect.selectOption(option);
	}
	async search(searchValue) {
		await this.searchInput.fill(searchValue);
		await this.page.keyboard.press("Enter");
	}
}
