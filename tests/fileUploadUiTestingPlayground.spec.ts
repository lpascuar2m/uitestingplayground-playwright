import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/upload');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Attach a file via drag&drop.", async ({ page }) => {
    const file = 'files/upload/Test Automation Framework Implementation Plan – Custom Fixtures.pdf';

    const fileInput = await page.locator('iframe').contentFrame().getByText('Browse files');
    await expect(fileInput).toBeVisible();
    await expect(fileInput).toBeEnabled();
    
    await fileInput.setInputFiles(file);  
});

test("Attach a file using `Browse files` button.", async ({ page }) => {
    const file = 'files/upload/Test Automation Framework Implementation Plan – Custom Fixtures.pdf';

    const fileInput = await page.locator('iframe').contentFrame().getByText('Browse files');
    await expect(fileInput).toBeVisible();
    await expect(fileInput).toBeEnabled();

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        fileInput.click(),
    ])

    await fileChooser.setFiles(file); 
});