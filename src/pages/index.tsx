import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CoinTable from '../Components//CoinTable';
import { fetchCoins } from '../services/api';
import {CoinData, portfolioCoin} from '../utils/types';
import Modal from "../Components/Modal";
import Input from "../Components/InputNumber";

//create context with callback function to add coin to portfolio
const PortfolioContext = React.createContext<CoinData | null>(null);
export const usePortfolio = () => React.useContext(PortfolioContext);


const HomePage: React.FC = () => {
    let offset: number = 0;
    const { data: coins, isLoading } = useQuery<CoinData[]>('coins', ()=>fetchCoins(offset));
    const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
    const [portfolioCoin, setPortfolioCoin] = useState<portfolioCoin | null>(null);

    useEffect(() => {
        if (coins) {
            //format coins that 0.12421 to 0.12
            const formattedCoins = coins.map((coin) => {
                return {
                    ...coin,
                    priceUsd: Number.parseFloat(coin.priceUsd).toFixed(2),
                    marketCapUsd: Number.parseFloat(coin.marketCapUsd).toFixed(2),
                    changePercent24Hr: Number.parseFloat(coin.changePercent24Hr).toFixed(2),
                };
            });
            setFilteredCoins(formattedCoins);
        }
    }, [coins]);

    //фильтрация монет
    const handleFilter = (search: string) => {
        if (!coins) return;
        const filteredCoins = coins.filter((coin) => {
            return coin.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredCoins(filteredCoins);
    };

    const handleAddToPortfolio = (coin: CoinData) => {
        console.log('add to portfolio', coin);
        setSelectedCoin(coin);
        setOpenModal(true);
    };
    //покупка монеты
    const handleBuy = () => {
        console.log('buy', portfolioCoin);
        
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
        // setSelectedCoin(null)
        }

    function fetchPageCoins() {
        // offset += 10;
    }

    function onClose() {
        setOpenModal(false);
        setSelectedCoin(null);
        setPortfolioCoin(null);
    }

    return (
        <div>
            <h1>Таблица Монет</h1>
            {isLoading ? <p>Loading...</p> : <CoinTable handleFilter={handleFilter} coins={filteredCoins} onAddToPortfolio={handleAddToPortfolio} fetchPageCoins={fetchPageCoins} />}
            <Modal open={openModal} onConfirm={handleBuy} onClose={()=>onClose()}>
                <h2>Добавить в портфель</h2>
                {selectedCoin && <p>{selectedCoin.name}</p>}
                <PortfolioContext.Provider value={selectedCoin}>
                <Input min = {1} max={1000} type='number' placeholder="Количество" onChange={handleChange}/>
                </PortfolioContext.Provider>
            </Modal>
        </div>
    );
};

export default HomePage;
