import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://beesmrt2.vercel.app/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByPlaceholder('beesmrt@example.com').click();
  await page.getByPlaceholder('beesmrt@example.com').fill('tester2@gmail.com');
  await page.getByPlaceholder('Happ&BEE1').click();
  await page.getByPlaceholder('Happ&BEE1').press('CapsLock');
  await page.getByPlaceholder('Happ&BEE1').fill('T');
  await page.getByPlaceholder('Happ&BEE1').press('CapsLock');
  await page.getByPlaceholder('Happ&BEE1').fill('Tester123456!');
  await page.getByRole('button', { name: 'LOG IN' }).click();
});