import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 1,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
});