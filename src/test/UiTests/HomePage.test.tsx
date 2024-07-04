import { test } from "@playwright/test"

test("test", async ({ page }) => {
	await page.goto("https://beesmrt2.vercel.app/")
	await page.getByRole("link", { name: "Memory Game Memory Game Find" }).click()
	await page.getByRole("link", { name: "logo" }).click()
	await page
		.getByRole("link", { name: "Hangman Hangman Practice your" })
		.click()
	await page.getByRole("link", { name: "logo" }).click()
	await page.getByRole("link", { name: "Drag and Drop Drag and Drop" }).click()
	await page.getByRole("link", { name: "logo" }).click()
})
