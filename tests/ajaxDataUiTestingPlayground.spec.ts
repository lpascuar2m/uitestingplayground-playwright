import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/ajax');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Navigate to Home page and record Load Delays link click and button click on this page.", async ({ page }) => {

    const btn = page.getByRole('button', { name: 'Button Triggering AJAX Request' });
    await expect(await btn).toBeVisible();
    await expect(await btn).toBeEnabled();
    await btn.click();

    await page.waitForLoadState('networkidle');

    const data = page.getByText('Data loaded with AJAX get');
    await expect(await data).toBeVisible();
    await expect(await data).toHaveText('Data loaded with AJAX get request.')
});