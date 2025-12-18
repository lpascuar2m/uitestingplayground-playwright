import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/dynamictable');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("For Chrome process get value of CPU load. Compare it with value in the yellow label.", async ({ page }) => {

    const row = await page.getByRole('row').filter({ hasText: 'Chrome' });
    const columnHeaders = page.getByRole('columnheader');
    const cpuIndex = await columnHeaders.evaluateAll(headers => 
        headers.findIndex(h => 
            h.textContent?.trim() === 'CPU'
        )
    );
    
    const target = row.getByRole('cell').nth(cpuIndex);
    const targetvalue = await target.textContent()

    const chromeValue = await page.locator('p.bg-warning').textContent();
    const cpuUsage = await chromeValue?.split(':')[1].trim();

    await expect(targetvalue).toEqual(cpuUsage);
});