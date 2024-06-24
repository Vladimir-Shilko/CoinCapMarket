import {CoinData, portfolioCoin} from "../utils/types";

const API_URL : string = 'https://api.coincap.io/v2';

export const fetchCoins : () => Promise<CoinData>  = async (): Promise<CoinData>  => {
    const response = await fetch(`${API_URL}/assets?limit=10`);
    const { data } = await response.json();
    return data.map((coin: CoinData) => ({
        id: coin.id,
        symbol: coin.symbol,
        priceUsd: +coin.priceUsd,
        logoUrl: `https://cryptologos.cc/logos/${coin.id}-${coin.symbol.toLowerCase()}-logo.png`,
        marketCapUsd: +coin.marketCapUsd,
        volumeUsd24Hr: +coin.volumeUsd24Hr,
        changePercent24Hr: +coin.changePercent24Hr,
        vwap24Hr: +coin.vwap24Hr,
        supply: +coin.supply,
        maxSupply: +coin.maxSupply,
        explorer: coin.explorer,
        name: coin.name,
        rank: +coin.rank,

    }));
}
export const fetchCoinDetails : (id: string) => Promise<CoinData> = async (id: string): Promise<CoinData> => {
    const response = await fetch(`${API_URL}/assets/${id}`);
    const { data } = await response.json();
    return {
        id: data.id,
        symbol: data.symbol,
        priceUsd: data.priceUsd,
        marketCapUsd: data.marketCapUsd,
        volumeUsd24Hr: data.volumeUsd24Hr,
        changePercent24Hr: data.changePercent24Hr,
        vwap24Hr: data.vwap24Hr,
        logoUrl: `https://cryptologos.cc/logos/${data.id}-${data.symbol.toLowerCase()}-logo.png`,
        supply: data.supply,
        maxSupply: data.maxSupply,
        explorer: data.explorer,
        name: data.name,
        rank: data.rank,
    };
}
export const fetchCoinHistory : (id: string) => Promise<CoinData> = async (id: string): Promise<CoinData> => {
    const response = await fetch(`${API_URL}/assets/${id}/history?interval=h1`);
    const { data } = await response.json();
    return data.map((coin: CoinData) => ({
        priceUsd: +coin.priceUsd,

    }));
}
export const fetchCoinPrices : () => Promise<CoinData[]> = async (): Promise<CoinData[]> => {
    const response = await fetch(`${API_URL}/assets?limit=10`);
    const { data } = await response.json();
    console.log(data);
    return data.map((coin: CoinData) => ({
        id: coin.id,
        symbol: coin.symbol,
        priceUsd: +coin.priceUsd,
        logoUrl: `https://cryptologos.cc/logos/${coin.id}-${coin.symbol.toLowerCase()}-logo.png`,
        marketCapUsd: +coin.marketCapUsd,
        volumeUsd24Hr: +coin.volumeUsd24Hr,
        changePercent24Hr: +coin.changePercent24Hr,
        vwap24Hr: +coin.vwap24Hr,
        supply: +coin.supply,
        maxSupply: +coin.maxSupply,
        explorer: coin.explorer,
        name: coin.name,
        rank: +coin.rank,

    }));
}
export const fetch3CoinPrices : () => Promise<CoinData[]> = async (): Promise<CoinData[]> => {
    const response = await fetch(`${API_URL}/assets?limit=3`);
    const { data } = await response.json();
    console.log(data);
    return data.map((coin: CoinData) => ({
        id: coin.id,
        symbol: coin.symbol,
        priceUsd: +coin.priceUsd,
        logoUrl: `https://cryptologos.cc/logos/${coin.id}-${coin.symbol.toLowerCase()}-logo.png`,
        marketCapUsd: +coin.marketCapUsd,
        volumeUsd24Hr: +coin.volumeUsd24Hr,
        changePercent24Hr: +coin.changePercent24Hr,
        vwap24Hr: +coin.vwap24Hr,
        supply: +coin.supply,
        maxSupply: +coin.maxSupply,
        explorer: coin.explorer,
        name: coin.name,
        rank: +coin.rank,

    }));

}
export const fetchPortfolioValue : (portfolio: portfolioCoin[]) => Promise<number> = async (portfolio): Promise<number> => {
    console.log('coins: '+ portfolio.length);
    const ids = portfolio.map((coin: portfolioCoin) => coin.id);
    console.log('ids: '+ids);
    const response = await fetch(`${API_URL}/assets?ids=${ids.join(',')}`);
    const { data } = await response.json();
    console.log('data i: '+data);
    //calculate total value of coins in portfolio with current prices from API and amount of coins
    const sum = portfolio.reduce((acc: number, coin: portfolioCoin) => {
        const { priceUsd } = data.find((item: CoinData) => item.id === coin.id);
        return acc + coin.amount * priceUsd;
    } , 0);
    return sum;
    // return data.reduce((total: number, coin: any) => total + +coin.priceUsd, 0);
}