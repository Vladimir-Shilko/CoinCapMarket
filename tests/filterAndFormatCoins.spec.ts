import {test, expect} from "@playwright/test";
import {CoinData} from "../src/utils/types";
//import page

test.describe('HomePage Component', ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('http://localhost:3000');
        await page.evaluate(() => localStorage.clear());
    });

    test('should filter coins',  async ({page})=>{
        const coins = [
            {name: 'Bitcoin', priceUsd: 50000, marketCapUsd: 1000000, changePercent24Hr: 0.1},
            {name: 'Ethereum', priceUsd: 3000, marketCapUsd: 500000, changePercent24Hr: 0.2},
            {name: 'Ripple', priceUsd: 1, marketCapUsd: 100000, changePercent24Hr: 0.3}
        ];
        await page.evaluate((handleFilter:any) => localStorage.setItem('coins', JSON.stringify(coins)), coins);

        await page.goto('http://localhost:3000');

        await page.fill('input', 'bitcoin');

        //check if only bitcoin is displayed
        const coinNames = await page.$$eval('.coin', () => coins.map((coin) => coin.name));
        expect(coinNames).toEqual(['Bitcoin']);
    });

    test('should format coins',  async ({page})=>{
        const coins = [
            {name: 'Bitcoin', priceUsd: 50000.12421, marketCapUsd: 1000000.12421, changePercent24Hr: 0.1},
            {name: 'Ethereum', priceUsd: 3000.12421, marketCapUsd: 500000.12421, changePercent24Hr: 0.2},
            {name: 'Ripple', priceUsd: 1.12421, marketCapUsd: 100000.12421, changePercent24Hr: 0.3}
        ];
        await page.evaluate((coins:CoinData) => localStorage.setItem('coins', JSON.stringify(coins)), coins);

        await page.goto('http://localhost:3000');

        const formattedCoins = await page.evaluate(() => JSON.parse(localStorage.getItem('coins') || '[]'));
        expect(formattedCoins).toEqual([
            {name: 'Bitcoin', priceUsd: '50000.12', marketCapUsd: '1000000.12', changePercent24Hr: '0.10'},
            {name: 'Ethereum', priceUsd: '3000.12', marketCapUsd: '500000.12', changePercent24Hr: '0.20'},
            {name: 'Ripple', priceUsd: '1.12', marketCapUsd: '100000.12', changePercent24Hr: '0.30'}
        ]);
    });

});
