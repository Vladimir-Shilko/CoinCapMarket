import react from 'react';
import { Button as AntdButton } from 'antd';
// import { ButtonProps } from 'antd/es/button';
// import './Button.css';
import {useQuery} from "react-query";
import {fetch3CoinPrices} from "../services/api";
import PortfolioValue from "./Portfolio/PortfolioValue";
import Loader from "./Loader";
import {CoinData} from "../utils/types";
//import Header from antd component
import { Layout } from 'antd';
//import css file
import '../styles/Header/Header.css';
const { Header } = Layout;
const HeaderMenu: React.FC = () => {
    const { data:coinPrices , isLoading } = useQuery('3coinPrices', fetch3CoinPrices);

    return (
        <Header>
            {isLoading ?
                (<Loader />) : (
                    coinPrices && coinPrices.map((coin:CoinData)=> (
                        <div className='popularCoin' key={coin.symbol}>
                            <img src={coin.logoUrl} alt="logo" width="32" />
                            <span>{coin.symbol}: ${Number.parseFloat(coin.priceUsd).toFixed(2)}</span>
                        </div>
                    ))
                )
            }
            <PortfolioValue/>
            {/*<PortfolioValue coinPrices={coinPrices} isLoading={isLoading} />*/}
        </Header>
    );
}

export default HeaderMenu