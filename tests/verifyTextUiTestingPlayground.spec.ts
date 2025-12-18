import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/verifytext');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Create a test that finds an element with 'Welcome' text.", async ({ page }) => {
    const elementsWithWelcomeText = await page.locator(':text-matches("Welcome")');
    const welcomeCount = await elementsWithWelcomeText.count();

    for (let i=0; i<welcomeCount; i++) {
        const element = elementsWithWelcomeText.nth(i);
        console.log(await element.textContent());
    }
});