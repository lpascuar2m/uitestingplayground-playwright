import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Navigate to Home page and record Load Delays link click and button click on this page.", async ({ page }) => {
    const loadDelayBtn = page.getByRole('link', { name: 'Load Delay' });
    await loadDelayBtn.click();

    await page.waitForLoadState('domcontentloaded');

    const btn = page.getByRole('button', { name: 'Button Appearing After Delay' });
    await expect(await btn).toBeVisible();
    await expect(await btn).toBeEnabled();
    await btn.click();
});