import {CoinData, portfolioCoin, CoinHistory} from "../utils/types";

const API_URL : string = 'https://api.coincap.io/v2';

export const fetchCoins : (offset: number, limit:number) => Promise<CoinData[]>  = async (offset, limit): Promise<CoinData[]>  => {
    const response = await fetch(`${API_URL}/assets?limit=${limit}&offset=${offset}`);
    const { data } = await response.json();
    console.log('adada '+data)
    const coins = data.map( async (coin: CoinData) => {
        const url = `https://cryptologos.cc/logos/${coin.id}-${coin.symbol.toLowerCase()}-logo.png`
        console.log('url: '+url);
        let logo
        try{
            logo = await fetch(url);
            console.log('logo: '+logo);
        }
        catch (e) {
            console.error(e);
            //if logo not found, set default logo
            //get logo from public folder of project
            logo = await fetch('https://cdn-icons-png.flaticon.com/512/179/179441.png');
        }
        console.log('logo: '+logo);
        if(logo){
        const blob = await logo.blob();
        const logoFile = new File([blob], `${coin.id}-${coin.symbol.toLowerCase()}-logo.png`, {type: 'image/png'});
        const reader = new FileReader();
        reader.readAsDataURL(logoFile);
        //wrap into Promise
        const dataPromise:Promise<CoinData> = new Promise((resolve) => {
            reader.onload = () => {
                console.log('coin: '+reader.result);
            resolve({
                id: coin.id,
                symbol: coin.symbol,
                priceUsd: coin.priceUsd,
                marketCapUsd: coin.marketCapUsd,
                volumeUsd24Hr: coin.volumeUsd24Hr,
                changePercent24Hr: coin.changePercent24Hr,
                vwap24Hr: coin.vwap24Hr,
                logoUrl: `https://cryptologos.cc/logos/${coin.id}-${coin.symbol.toLowerCase()}-logo.png`,
                supply: coin.supply,
                maxSupply: coin.maxSupply,
                explorer: coin.explorer,
                name: coin.name,
                rank: coin.rank,
                logoFile: reader.result as string,
            });
            }
        });
        return dataPromise;
        }
    })
    console.log('coins: '+coins);
    return Promise.all(coins);
}
export const fetchCoinDetails : (id: string) => Promise<CoinData> = async (id: string): Promise<CoinData> => {
    const response = await fetch(`${API_URL}/assets/${id}`);
    const { data } = await response.json();
    //load url of logo from cryptologos.cc
    // const logoUrl  = `https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`
    const logoUrl = `https://cryptologos.cc/logos/${data.id}-${data.symbol.toLowerCase()}-logo.png`
    //load from logoUrl into file
    let logo;
    try {
        logo = await fetch(logoUrl);
    }
    catch (e) {
        console.error(e);
        //if logo not found, set default logo
        //get logo from public folder of project
        logo = await fetch('https://cdn-icons-png.flaticon.com/512/179/179441.png');
    }
    const blob = await logo.blob();
    const logoFile = new File([blob], `${data.id}-${data.symbol.toLowerCase()}-logo.png`, {type: 'image/png'});
    const reader = new FileReader();
    reader.readAsDataURL(logoFile);
    //wrap into Promise
    const dataPromise:Promise<CoinData> = new Promise((resolve) => {
        reader.onload = () => {
            resolve({
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
                logoFile: reader.result as string,
            });
        }
    });
    
    return dataPromise;
}
export const fetchCoinHistory : (id: string, interval: string) => Promise<CoinHistory[]> = async (id: string, interval): Promise<CoinHistory[]> => {
    const response = await fetch(`${API_URL}/assets/${id}/history?interval=h${interval}`);
    const { data } = await response.json();
    return data.map((coin: CoinHistory) => ({
        priceUsd: coin.priceUsd,
        time: +coin.time,
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
}