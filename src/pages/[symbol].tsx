// import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchCoinDetails } from '../services/api';
import { CoinData } from '../utils/types';
// import PriceChart from '../Components/PriceChart/PriceChart';
import Loader from '../Components/Loader';
import ErrorMessage from '../Components/ErrorMessage';

const CoinDetailPage: React.FC = () => {
    // const router = useRouter();
    // const { symbol } = router.query;
    const symbol: string = 'bitcoin'
    const { data: coin, isLoading, error } = useQuery<CoinData>(['coin', symbol], () => fetchCoinDetails(symbol as string), {
        enabled: !!symbol,
    });

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message="Ошибка загрузки данных" />;

    return (
        <div>
            {/*<button onClick={() => router.push('/')}>Назад</button>*/}
            <h1>{coin && coin.symbol}</h1>

            <img src={coin && coin.logoUrl} alt={coin && coin.symbol} width="64" />
            {/*<p>Rank: {coin && coin?.rank}</p>*/}
            {/*<p>Supply: {coin && coin?.supply}</p>*/}
            <p>Цена (USD): { coin && Number.parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Рын. капитализация (USD): {coin && coin.marketCapUsd.toLocaleString()}</p>
            {/*<p>Max Supply: {coin?.maxSupply}</p>*/}
            {/*<PriceChart symbol={symbol as string} />*/}
            <button onClick={() => {/* Логика добавления монеты в портфель */}}>Add</button>
        </div>
    );
};

export default CoinDetailPage;
