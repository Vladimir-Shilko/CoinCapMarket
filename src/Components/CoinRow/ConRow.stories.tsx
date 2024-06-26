// import React from "react";
// import { ComponentMeta, ComponentStory } from "@storybook/react";
// import CoinRow from "./CoinRow";
// import {CoinData, CoinRowProps} from "../../utils/types";
//
// export default {
//     title: "Components/CoinRow",
//     component: CoinRow,
// } as ComponentMeta<typeof CoinRow>;
//
// const Template: ComponentStory<typeof CoinRow> = (args: CoinRowProps) => <CoinRow {...args} />;
// export const Default = Template.bind({});
// Default.args = {
//     coin: {
//         id: "bitcoin",
//         name: "Bitcoin",
//         symbol: "BTC",
//         image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//         current_price: 50000,
//         market_cap: 1000000000000,
//         market_cap_rank: 1,
//         total_volume: 100000000000,
//         price_change_percentage_24h: 1,
//     },
//     onAddToPortfolio: () => {},
// };
// export const Secondary = Template.bind({});
// Secondary.args = {
//     coin: {
//         id: "ethereum",
//         name: "Ethereum",
//         symbol: "ETH",
//         image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
//         current_price: 2000,
//         market_cap: 500000000000,
//         market_cap_rank: 2,
//         total_volume: 50000000000,
//         price_change_percentage_24h: 0.5,
//     },
//     onAddToPortfolio: (coin:CoinData) => {},
// };