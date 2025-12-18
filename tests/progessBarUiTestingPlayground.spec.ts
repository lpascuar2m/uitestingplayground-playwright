import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/progressbar');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("Create a test that clicks Start button and then waits for the progress bar to reach 75%. Then the test should click Stop. The less the differnce between value of the stopped progress bar and 75% the better your result.", async ({ page }) => {

    const startbtn = await page.getByRole('button', { name: 'Start' });
    await expect(startbtn).toBeVisible();
    await expect(startbtn).toBeEnabled();
    await startbtn.click();

    const progressBar = page.getByTestId('progressBar');
    await progressBar.waitFor();

    let progressValue = 0;
    while (progressValue < 75) {
        const progressText = await progressBar.textContent();
        
        if(progressText){
            progressValue = parseInt(progressText?.replace('%', ''));
        }
    }

    const stopbtn = await page.getByRole('button', { name: 'Stop' });
    await expect(stopbtn).toBeVisible();
    await expect(stopbtn).toBeEnabled();
    await stopbtn.click();
});