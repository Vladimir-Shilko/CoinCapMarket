import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CoinTable from '../Components//CoinTable';
import { fetchCoins } from '../services/api';
import { CoinData } from '../utils/types';

const HomePage: React.FC = () => {
    const { data: coins, isLoading } = useQuery<CoinData[]>('coins', fetchCoins);
    const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);

    useEffect(() => {
        if (coins) {
            setFilteredCoins(coins);
        }
    }, [coins]);

    const handleAddToPortfolio = (coin: CoinData) => {
        // Логика добавления монеты в портфель
        const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
        portfolio.push({...coin, amount: 1});
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
    };

    return (
        <div>
            <h1>Таблица Монет</h1>
            {isLoading ? <p>Loading...</p> : <CoinTable coins={filteredCoins} onAddToPortfolio={handleAddToPortfolio} />}
        </div>
    );
};

export default HomePage;
