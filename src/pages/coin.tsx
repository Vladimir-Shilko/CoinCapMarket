// import { useRouter } from 'next/router';
import React, {useEffect} from "react";
import { useQuery } from 'react-query';
import { fetchCoinDetails } from '../services/api';
import { CoinData, portfolioCoin } from '../utils/types';
import { useParams } from 'react-router-dom';
// import PriceChart from '../Components/PriceChart/PriceChart';
import Loader from '../Components/Loader/Loader';
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';
import PriceChart from '../Components/PriceChart/PriceChart';

import Button from "../Components/Button/Button";
import Input from "../Components/Inputs/InputNumber";
import Modal from "../Components/Modal/Modal";
import {Select} from "antd";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const CoinDetailPage: React.FC = () => {
    // const router = useRouter();
    // const { symbol } = router.query;
    // const symbol: string = 'bitcoin'
    const { symbol } = useParams();
    const { data: coin, isLoading, error } = useQuery<CoinData>(['coin', symbol], () => fetchCoinDetails(symbol as string), {
        enabled: !!symbol,
    });
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [interval, setInterval] = React.useState<string>('1');
    const [amount, setAmount] = React.useState<number>(1);
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message="Ошибка загрузки данных" />;

    const handleChange = (value: number) => {
        setAmount(value);
    };
    const handleBuy = () => {
        // Добавить в портфель
        const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
        if(coin && amount>0){
        const portfoliocoin: portfolioCoin = {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            priceUsd: Number.parseFloat(coin.priceUsd),
            amount: amount,
            uniqueId: String(Date.now())
        };
        portfolio.push(portfoliocoin);
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        }


        setOpenModal(false);
    };
    const onClose = () => {
        setOpenModal(false);
    };

    function changeInterval(value: string) {
        setInterval(value);
    }

    return (
        <div>
            <Button onClick={() => window.history.back()}>Назад</Button>
            <Button onClick={()=> setOpenModal(true)}>Добавить в портфель</Button>
            {/*<button onClick={() => router.push('/')}>Назад</button>*/}
            <h1>{coin && coin.name}</h1>
            <h2>{coin && coin.symbol}</h2>
            <img src={coin && coin.logoUrl} alt={coin && coin.symbol} width="64"/>
            <p>Rank: {coin && coin.rank}</p>
            <p>Supply: {coin && Number.parseFloat(coin.supply).toFixed(2)}</p>
            <p>Цена (USD): {coin && Number.parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Рын. капитализация (USD): {coin && Number.parseFloat(coin.marketCapUsd.toLocaleString()).toFixed(2)}</p>
            <p>Max Supply: {coin && Number.parseFloat(coin.maxSupply).toFixed(2)}</p>
            <select  onChange={(e) => {changeInterval(e.target.value)}}>
                <option value="1">1 месяц</option>
                <option value="12">12 месяцев</option>
                <option value="24">24 месяца</option>
            </select>
            {/*<Button onClick={()=> se}>Reload</Button>*/}
            <PriceChart symbol={symbol as string} interval={interval}/>
            <Modal open={openModal} onConfirm={handleBuy} onClose={()=>onClose()}>
                <h2>Добавить в портфель</h2>
                {coin && <p>{coin.name}</p>}
                    <Input min = {1} max={1000} type='number' placeholder="Количество" onChange={handleChange}/>
            </Modal>
        </div>
    );
};

export default CoinDetailPage;
