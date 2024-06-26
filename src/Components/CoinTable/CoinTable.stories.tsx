// import React from 'react';
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import CoinTable from './CoinTable';
// import {CoinData, CoinTableProps} from '../../utils/types'
//
// export default {
//     title: 'Components/CoinTable',
//     component: CoinTable,
// } as ComponentMeta<typeof CoinTable>;
//
// const Template: ComponentStory<typeof CoinTable> = (args: CoinTableProps) => <CoinTable {...args} />;
//
// const sampleCoins: CoinData[] = [
//     {
//         id: 'bitcoin',
//         symbol: 'BTC',
//         name: 'Bitcoin',
//         priceUsd: '50000',
//         marketCapUsd: '1000000000',
//         changePercent24Hr: '0.5',
//         logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
//         rank: '1',
//         volumeUsd24Hr: '100000000000',
//         vwap24Hr: '50000',
//         supply: '1000000',
//         maxSupply: '10000000',
//         explorer: 'https://blockchain.info/',
//     },
//     {
//         id: 'ethereum',
//         symbol: 'ETH',
//         name: 'Ethereum',
//         priceUsd: '2000',
//         marketCapUsd: '500000000',
//         changePercent24Hr: '0.3',
//         logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
//         rank: '2',
//         volumeUsd24Hr: '50000000000',
//         vwap24Hr: '2000',
//         supply: '1000000',
//         maxSupply: '10000000',
//         explorer: 'https://blockchain.info/',
//     },
//     {
//         id: 'ripple',
//         symbol: 'XRP',
//         name: 'Ripple',
//         priceUsd: '1',
//         marketCapUsd: '100000000',
//         changePercent24Hr: '0.1',
//         logoUrl: 'https://cryptologos.cc/logos/ripple-xrp-logo.png',
//         rank: '3',
//         volumeUsd24Hr: '1000000000',
//         vwap24Hr: '1',
//         supply: '1000000',
//         maxSupply: '10000000',
//         explorer: 'https://blockchain.info/',
//     },
//     {
//         id: 'litecoin',
//         symbol: 'LTC',
//         name: 'Litecoin',
//         priceUsd: '200',
//         marketCapUsd: '10000000',
//         changePercent24Hr: '0.2',
//         logoUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
//         rank: '4',
//         volumeUsd24Hr: '10000000',
//         vwap24Hr: '200',
//         supply: '1000000',
//         maxSupply: '10000000',
//         explorer: 'https://blockchain.info/',
//     },
//     {
//         id: 'tether',
//         symbol: 'USDT',
//         name: 'Tether',
//         priceUsd: '1',
//         marketCapUsd: '100000000',
//         changePercent24Hr: '0',
//         logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
//         rank: '5',
//         volumeUsd24Hr: '1000000000',
//         vwap24Hr: '1',
//         supply: '1000000',
//         maxSupply: '10000000',
//         explorer: 'https://blockchain.info/',
//     },
// ];
//
// export const Default = Template.bind({});
// Default.args = {
//     coins: sampleCoins,
//     onAddToPortfolio: (coin:CoinData) => console.log('Added to portfolio:', coin),
// };
//
// export const Loading = Template.bind({});
// Loading.args = {
//     coins: [],
//     isLoading: true,
//     onAddToPortfolio: (coin:CoinData) => console.log('Added to portfolio:', coin),
// };
//
// export const Empty = Template.bind({});
// Empty.args = {
//     coins: [],
//     onAddToPortfolio: (coin:CoinData) => console.log('Added to portfolio:', coin),
// };
//
// export const Error = Template.bind({});
// Error.args = {
//     coins: null,
//     onAddToPortfolio: (coin:CoinData) => console.log('Added to portfolio:', coin),
// };
//
// export const WithPagination = Template.bind({});
// WithPagination.args = {
//     coins: sampleCoins,
//     onAddToPortfolio: (coin:CoinData) => console.log('Added to portfolio:', coin),
//     fetchPageCoins: () => console.log('Fetching more coins...'),
// };
//
// export const WithFilter = Template.bind({});
// WithFilter.args = {
//     coins: sampleCoins,
//     onAddToPortfolio: (coin:CoinData) => console.log('Added to portfolio:', coin),
//     handleFilter: (search: string) => console.log('Filtering by:', search),
// };
//
