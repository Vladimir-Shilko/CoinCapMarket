//use types.ts file to define types and interfaces that are used in multiple components
export interface CoinData {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    supply: string;
    maxSupply: string;
    explorer: string;
    logoUrl: string;
}
export interface portfolioCoin {
    uniqueId: string;
    id: string;
    amount: number;
    priceUsd: number;
    //another fields are not required
    rank?: string;
    symbol?: string;
    name?: string;
    marketCapUsd?: string;
    volumeUsd24Hr?: string;
    changePercent24Hr?: string;
    vwap24Hr?: string;
    supply?: string;
    maxSupply?: string;
    explorer?: string;
    logoUrl?: string;


}