// import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchCoinDetails } from '../services/api';
import { CoinData } from '../utils/types';
import { useParams } from 'react-router-dom';
// import PriceChart from '../Components/PriceChart/PriceChart';
import Loader from '../Components/Loader';
import ErrorMessage from '../Components/ErrorMessage';
import PriceChart from '../Components/PriceChart/PriceChart';
import React from "react";
import Button from "../Components/Button";

const CoinDetailPage: React.FC = () => {
    // const router = useRouter();
    // const { symbol } = router.query;
    // const symbol: string = 'bitcoin'
    const { symbol } = useParams();
    const { data: coin, isLoading, error } = useQuery<CoinData>(['coin', symbol], () => fetchCoinDetails(symbol as string), {
        enabled: !!symbol,
    });
    const [interval, setInterval] = React.useState<string>('1');
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message="Ошибка загрузки данных" />;

    return (
        <div>
            <Button onClick={() => window.history.back()}>Назад</Button>
            {/*<button onClick={() => router.push('/')}>Назад</button>*/}
            <h1>{coin && coin.name}</h1>
            <h2>{coin && coin.symbol}</h2>

            <img src={coin && coin.logoUrl} alt={coin && coin.symbol} width="64" />
            <p>Rank: {coin && coin.rank}</p>
            <p>Supply: {coin && Number.parseFloat(coin.supply).toFixed(2)}</p>
            <p>Цена (USD): { coin && Number.parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Рын. капитализация (USD): {coin && Number.parseFloat(coin.marketCapUsd.toLocaleString()).toFixed(2)}</p>
            <p>Max Supply: {coin && Number.parseFloat(coin.maxSupply).toFixed(2)}</p>
            <PriceChart symbol={symbol as string} interval={interval} />
            <button onClick={() => {/* Логика добавления монеты в портфель */}}>Add</button>
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                <option value="1">1 месяц</option>
                <option value="12">12 месяцев</option>
                <option value="24">24 месяца</option>
            </select>
        </div>
    );
};

export default CoinDetailPage;
