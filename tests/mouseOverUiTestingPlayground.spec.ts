import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/mouseover');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Record 2 consecutive link clicks.", async ({ page }) => {
    await page.getByText('Link Button').dblclick({ button: 'left' });

    const counter = page.locator('#clickButtonCount');

    await expect(await counter).toBeVisible();
    await expect(await counter.textContent()).toBe('2');
});