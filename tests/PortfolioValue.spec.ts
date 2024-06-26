import { test, expect } from '@playwright/test';
import {portfolioCoin} from "../src/utils/types";

test.describe('PortfolioValue Component', () => {
    test.beforeEach(async ({ page }) => {
        // Очищаем localStorage перед каждым тестом
        await page.goto('http://localhost:3000');
        await page.evaluate(() => localStorage.clear());
    });

    test('should display correct portfolio value and calculation', async ({ page }) => {
        // Добавляем данные в localStorage
        const portfolio = [
            { symbol: 'BTC', amount: 1, priceUsd: 50000, uniqueId: '1' },
            { symbol: 'ETH', amount: 2, priceUsd: 3000, uniqueId: '2' },
        ];
        await page.evaluate((portfolio: portfolioCoin) => localStorage.setItem('portfolio', JSON.stringify(portfolio)), portfolio);

        await page.goto('http://localhost:3000');

        // Проверяем наличие правильного портфельного значения
        const portfolioValue = await page.textContent('.portfolio');
        expect(portfolioValue).toContain('Портфель: 56000 USD');
    });
});