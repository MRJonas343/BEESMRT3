import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
	await page.goto("https://beesmrt2.vercel.app/")
	await page.getByRole("link", { name: "About Us" }).click()
})
