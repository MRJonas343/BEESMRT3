//Test hecho con éxito

// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://beesmrt2.vercel.app/');
//   await page.getByRole('link', { name: 'Log In' }).click();
//   await page.getByRole('link', { name: 'Get an Account' }).click();
//   await page.getByPlaceholder('Jhon Beesmith').click();
//   await page.getByPlaceholder('Jhon Beesmith').press('CapsLock');
//   await page.getByPlaceholder('Jhon Beesmith').fill('T');
//   await page.getByPlaceholder('Jhon Beesmith').press('CapsLock');
//   await page.getByPlaceholder('Jhon Beesmith').fill('SecondTester');
//   await page.getByPlaceholder('Mr.BEE343').click();
//   await page.getByPlaceholder('Mr.BEE343').fill('2ndtester');
//   await page.getByPlaceholder('beesmrt@example.com').click();
//   await page.getByPlaceholder('beesmrt@example.com').fill('tester2@gmail.com');
//   await page.locator('input[name="password"]').click();
//   await page.locator('input[name="password"]').press('CapsLock');
//   await page.locator('input[name="password"]').fill('T');
//   await page.locator('input[name="password"]').press('CapsLock');
//   await page.locator('input[name="password"]').fill('Tester123456!');
//   await page.locator('form div').filter({ hasText: 'Confirm password: Sign UpDo' }).getByPlaceholder('Happ&BEE1').click();
//   await page.locator('form div').filter({ hasText: 'Confirm password: Sign UpDo' }).getByPlaceholder('Happ&BEE1').press('CapsLock');
//   await page.locator('form div').filter({ hasText: 'Confirm password: Sign UpDo' }).getByPlaceholder('Happ&BEE1').fill('T');
//   await page.locator('form div').filter({ hasText: 'Confirm password: Sign UpDo' }).getByPlaceholder('Happ&BEE1').press('CapsLock');
//   await page.locator('form div').filter({ hasText: 'Confirm password: Sign UpDo' }).getByPlaceholder('Happ&BEE1').fill('Tester123456!');
//   await page.getByRole('button', { name: 'Sign Up' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
// });

//Test sin hacer para el momento de la demostración...

import { test } from "@playwright/test"

test("test", async ({ page }) => {
	await page.goto("https://beesmrt2.vercel.app/")
	await page.getByRole("link", { name: "Log In" }).click()
	await page.getByRole("link", { name: "Get an Account" }).click()
	await page.getByPlaceholder("Jhon Beesmith").click()
	await page.getByPlaceholder("Jhon Beesmith").press("CapsLock")
	await page.getByPlaceholder("Jhon Beesmith").fill("T")
	await page.getByPlaceholder("Jhon Beesmith").press("CapsLock")
	await page.getByPlaceholder("Jhon Beesmith").fill("Third")
	await page.getByPlaceholder("Jhon Beesmith").press("CapsLock")
	await page.getByPlaceholder("Jhon Beesmith").fill("ThirdT")
	await page.getByPlaceholder("Jhon Beesmith").press("CapsLock")
	await page.getByPlaceholder("Jhon Beesmith").fill("ThirdTester")
	await page.getByPlaceholder("Mr.BEE343").click()
	await page.getByPlaceholder("Mr.BEE343").fill("thirdtester")
	await page.getByPlaceholder("beesmrt@example.com").click()
	await page.getByPlaceholder("beesmrt@example.com").fill("3rdtester@gmail.com")
	await page.locator('input[name="password"]').click()
	await page.locator('input[name="password"]').press("CapsLock")
	await page.locator('input[name="password"]').fill("T")
	await page.locator('input[name="password"]').press("CapsLock")
	await page.locator('input[name="password"]').fill("Tester123456!")
	await page
		.locator("form div")
		.filter({ hasText: "Confirm password: Sign UpDo" })
		.getByPlaceholder("Happ&BEE1")
		.click()
	await page
		.locator("form div")
		.filter({ hasText: "Confirm password: Sign UpDo" })
		.getByPlaceholder("Happ&BEE1")
		.press("CapsLock")
	await page
		.locator("form div")
		.filter({ hasText: "Confirm password: Sign UpDo" })
		.getByPlaceholder("Happ&BEE1")
		.fill("T")
	await page
		.locator("form div")
		.filter({ hasText: "Confirm password: Sign UpDo" })
		.getByPlaceholder("Happ&BEE1")
		.press("CapsLock")
	await page
		.locator("form div")
		.filter({ hasText: "Confirm password: Sign UpDo" })
		.getByPlaceholder("Happ&BEE1")
		.fill("Tester123456!")
	await page.getByRole("button", { name: "Sign Up" }).click()
	await page.getByRole("button", { name: "Close" }).click()
})
