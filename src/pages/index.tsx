import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CoinTable from '../Components/CoinTable/CoinTable';
import { fetchCoins } from '../services/api';
import {CoinData, portfolioCoin} from '../utils/types';
import Modal from "../Components/Modal/Modal";
import Input from "../Components/Inputs/InputNumber";

//create context with callback function to add coin to portfolio
const PortfolioContext = React.createContext<CoinData | null>(null);
export const usePortfolio = () => React.useContext(PortfolioContext);

const HomePage: React.FC = () => {
    let offset: number = 0;
    const { data: coins, isLoading } = useQuery<CoinData[]>('coins', ()=>fetchCoins(offset, 10));
    const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
    const [portfolioCoin, setPortfolioCoin] = useState<portfolioCoin | null>(null);
    useEffect(() => {
        if (coins) {
            //format coins that 0.12421 to 0.12
            let formattedCoins = coins.filter((coin: CoinData) => coin.priceUsd && coin.marketCapUsd && coin.volumeUsd24Hr && coin.changePercent24Hr && coin.vwap24Hr  && coin.name && coin.rank);
            formattedCoins = formattedCoins.map((coin) => {
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
        if (filteredCoins.length === 0) {
            fetchCoins(0, 100).then((coins) => {
                //search again
                const filteredCoins = coins.filter((coin) => {
                    return coin.name.toLowerCase().includes(search.toLowerCase());
                });
                setFilteredCoins(filteredCoins);

                }
            );
        }
        else {
            setFilteredCoins(filteredCoins);
        }
    };

    const handleAddToPortfolio = (coin: CoinData) => {
        console.log('add to portfolio', coin);
        setSelectedCoin(coin);
        if (coin){
            const portfolioCoin: portfolioCoin = {
                ...coin,
                amount: 1,
                priceUsd: Number.parseFloat(coin.priceUsd)
            };
            setPortfolioCoin(portfolioCoin)
        }
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
        const coin: CoinData | null = selectedCoin;
        if (coin && value > 0){
            const portfolioCoin: portfolioCoin = {
                ...coin,
                amount: value,
                priceUsd: Number.parseFloat(coin.priceUsd)
            };
            setPortfolioCoin(portfolioCoin)
        }
        }

    async function fetchPageCoins(page: number) {
        offset = (page-1) * 10;
        const coins = await fetchCoins(offset, 10);
        setFilteredCoins(coins);
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
