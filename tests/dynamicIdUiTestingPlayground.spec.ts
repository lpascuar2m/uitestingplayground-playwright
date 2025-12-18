import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/dynamicid');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Record button click.", async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button with Dynamic ID' });
    await expect(await button).toBeVisible();
    await expect(await button).toBeEnabled();
    await button.click();
});