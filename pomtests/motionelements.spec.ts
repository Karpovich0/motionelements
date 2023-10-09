import { test, expect } from "@playwright/test";
import indexPage from "../pages/indexPage";
import loginPage from "../pages/loginPage";
import registerPage from "../pages/registerPage";

const GMAIL: string = "qatestsunlimited@gmail.com";
const PASSWORD: string = "87654321TestRegistration.1";

test.beforeEach(async ({ page }) => {
	await page.goto("https://www.motionelements.com/");
});

test.describe("MotionElements", () => {
	test("Sign in with valid data", async ({ page }) => {
		const indexPg = new indexPage(page);
		const loginPg = new loginPage(page);
		indexPg.clickLogin();
		loginPg.inputForm(GMAIL, PASSWORD);
		await page.waitForTimeout(2000);
		loginPg.pressLoginButton();
		await expect(page).toHaveURL("https://www.motionelements.com/account/dashboard");
		await expect(page.locator(".artist-avatar")).toBeVisible();
	});
	test("Sign up with invalid data", async ({ page }) => {
		const indexPg = new indexPage(page);
		const loginPg = new loginPage(page);

		indexPg.clickLogin();
		loginPg.inputForm(GMAIL, "wrongPassword");
		await page.waitForTimeout(2000);
		loginPg.pressLoginButton();
		await expect(page.locator(".flash-wrapper")).toBeVisible();
	});
	test("Use the same email twice for registration", async ({ page }) => {
		const indexPg = new indexPage(page);
		const loginPg = new loginPage(page);
		const registerPg = new registerPage(page);
		indexPg.clickLogin();
		await page.waitForLoadState();
		loginPg.pressRegisterButton();
		await page.waitForTimeout(2000);

		registerPg.inputForm("Name", "Surname", GMAIL, PASSWORD);
		await page.waitForTimeout(2000);
		registerPg.pressRegisterButton();

		await page.waitForTimeout(3000);
		await expect(page.locator(".toast-header-text")).toBeVisible();
	});
	test("Change language by using footer's select", async ({ page }) => {
		const indexPg = new indexPage(page);
		await page.waitForTimeout(2000);
		indexPg.scrollToSelect();
		await page.waitForTimeout(2000);
		indexPg.selectOption("fr");
		await expect(page).toHaveURL("https://www.motionelements.com/fr/");
		await expect(page.locator("h1.h1")).toHaveText(
			"Vidéo, musique, modèles vidéo libres de droits pour les créateurs de vidéos"
		);
	});
	test("Search Functionality", async ({ page }) => {
		const SEARCH_WORD = "cat";
		const indexPg = new indexPage(page);
		indexPg.search(SEARCH_WORD);
		await expect(page).toHaveURL("https://www.motionelements.com/search/video?s=cat&sort=match");
		await expect(page.locator("#search-results-heading")).toContainText(SEARCH_WORD);
	});
});
