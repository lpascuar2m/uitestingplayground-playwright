import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/classattr');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Record primary (blue) button click and press ok in alert popup.", async ({ page }) => {
    const button = page.locator("button.btn-primary");
    await expect(await button).toBeVisible();
    await expect(await button).toBeEnabled();
    await button.click();

    await page.on("dialog", async (dialog) => {
        await dialog.accept();
    })

    await page.waitForTimeout(5000);
});