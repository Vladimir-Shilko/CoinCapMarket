import React from 'react';
import {useQuery} from "react-query";
import {fetch3CoinPrices} from "../../services/api";
import PortfolioValue from "../Portfolio/PortfolioValue";
import Loader from "../Loader/Loader";
import {CoinData} from "../../utils/types";
import { Layout } from 'antd';
import './Header.css';
const { Header } = Layout;
const HeaderMenu: React.FC = () => {
    const { data:coinPrices , isLoading } = useQuery('3coinPrices', fetch3CoinPrices);
    return (
        <div>

        <Header className='header'>
                    {isLoading ?
                        (<Loader />) : (
                            coinPrices && coinPrices.map((coin:CoinData)=> (
                                <div className='popularCoin' key={coin.symbol}>
                                    <img src={coin.logoUrl} alt="logo" width="20" />
                                    <span>{coin.symbol}: ${Number.parseFloat(coin.priceUsd).toFixed(2)}</span>
                                </div>
                            ))
                        )
                    }
                    <PortfolioValue/>
        </Header>
    </div>
    );
}

export default HeaderMenu