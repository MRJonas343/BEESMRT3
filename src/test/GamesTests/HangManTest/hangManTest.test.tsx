import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://beesmrt2.vercel.app/');
  await page.getByRole('link', { name: 'Hangman Hangman Practice your' }).click();
  await page.getByRole('link', { name: 'Single Player Play' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Greetings' }).click();
  await page.getByRole('button', { name: 'H' }).click();
  await page.getByRole('button', { name: 'E' }).click();
  await page.getByRole('button', { name: 'L' }).click();
  await page.getByRole('button', { name: 'O', exact: true }).click();
  await page.getByRole('button', { name: 'H' }).click();
  await page.getByRole('button', { name: 'I' }).click();
  await page.getByRole('button', { name: 'G' }).click();
  await page.getByRole('button', { name: 'O', exact: true }).click();
  await page.getByRole('button', { name: 'D' }).click();
  await page.getByRole('button', { name: 'B' }).click();
  await page.getByRole('button', { name: 'Y', exact: true }).click();
  await page.getByRole('button', { name: 'E' }).click();
  await page.getByRole('button', { name: 'P' }).click();
  await page.getByRole('button', { name: 'L' }).click();
  await page.getByRole('button', { name: 'E' }).click();
  await page.getByRole('button', { name: 'A', exact: true }).click();
  await page.getByRole('button', { name: 'S' }).click();
  await page.getByRole('button', { name: 'T', exact: true }).click();
});