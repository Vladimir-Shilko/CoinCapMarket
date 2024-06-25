import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CoinTable from '../Components//CoinTable';
import { fetchCoins } from '../services/api';
import {CoinData, portfolioCoin} from '../utils/types';
import Modal from "../Components/Modal";
import Input from "../Components/Input";

//create context with callback function to add coin to portfolio
const PortfolioContext = React.createContext<CoinData | null>(null);
export const usePortfolio = () => React.useContext(PortfolioContext);


const HomePage: React.FC = () => {
    const { data: coins, isLoading } = useQuery<CoinData[]>('coins', fetchCoins);
    const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
    const [portfolioCoin, setPortfolioCoin] = useState<portfolioCoin | null>(null);
    useEffect(() => {
        if (coins) {
            setFilteredCoins(coins);
        }
    }, [coins]);

    const handleAddToPortfolio = (coin: CoinData) => {
        setSelectedCoin(coin);
        setOpenModal(true);
    };
    //покупка монеты
    const handleBuy = () => {
        if(!portfolioCoin || portfolioCoin.amount == null || portfolioCoin.amount <1 ) return;
        // Логика добавления монеты в портфель
        const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
        if(portfolioCoin) portfolioCoin.uniqueId = String(Date.now());
        portfolio.push({...portfolioCoin});
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        setOpenModal(false)
    };
    const handleChange = (value: number) => {
        let coin: CoinData | null = selectedCoin;
        if (coin && value > 0){
            let portfolioCoin: portfolioCoin = {
                ...coin,
                amount: value,
                priceUsd: Number.parseFloat(coin.priceUsd)
            };
            setPortfolioCoin(portfolioCoin)
        }
        setPortfolioCoin(null)
        }

    return (
        <div>
            <h1>Таблица Монет</h1>
            {isLoading ? <p>Loading...</p> : <CoinTable coins={filteredCoins} onAddToPortfolio={handleAddToPortfolio} />}
            <Modal open={openModal} onConfirm={handleBuy} onClose={()=>setOpenModal(false)}>
                <h2>Добавить в портфель</h2>
                {selectedCoin && <p>{selectedCoin.name}</p>}
                <PortfolioContext.Provider value={selectedCoin}>
                <Input placeholder="Количество" onChange={handleChange}/>
                </PortfolioContext.Provider>
            </Modal>
        </div>
    );
};

export default HomePage;
