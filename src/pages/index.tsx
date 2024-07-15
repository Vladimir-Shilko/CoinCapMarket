import React, { useState,  useMemo, useCallback, useEffect } from 'react';
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
    const memoFilteredCoins : CoinData[] = useMemo(() => {
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
            return formattedCoins;
        }
        return [];
    }, [coins]);
    useEffect(()=>{
        setFilteredCoins(memoFilteredCoins)
    },[memoFilteredCoins])
    
    const handleFilter = useCallback((search: string) => {
        if (!coins) return;
        const filteredCoins = coins.filter((coin) => {
            return coin.name.toLowerCase().includes(search.toLowerCase());
        });
        if (filteredCoins.length === 0) {
            fetchCoins(0, 100).then((coins) => {
                const filteredCoins = coins.filter((coin) => {
                    return coin.name.toLowerCase().includes(search.toLowerCase());
                });
                setFilteredCoins(filteredCoins);
            });
        } else {
            setFilteredCoins(filteredCoins);
        }
    }, [coins]);

    const handleAddToPortfolio = useCallback((coin: CoinData) => {
        setSelectedCoin(coin);
        if (coin) {
            const portfolioCoin: portfolioCoin = {
                ...coin,
                amount: 1,
                priceUsd: Number.parseFloat(coin.priceUsd)
            };
            setPortfolioCoin(portfolioCoin)
        }
        setOpenModal(true);
    }, []);

    const handleBuy = useCallback(() => {
        if (!portfolioCoin || portfolioCoin.amount == null || portfolioCoin.amount < 1) return;
        const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
        if (portfolioCoin) portfolioCoin.uniqueId = String(Date.now());
        portfolio.push({ ...portfolioCoin });
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        setOpenModal(false);
    }, [portfolioCoin]);

    const handleChange = useCallback((value: number) => {
        const coin: CoinData | null = selectedCoin;
        if (coin && value > 0) {
            const portfolioCoin: portfolioCoin = {
                ...coin,
                amount: value,
                priceUsd: Number.parseFloat(coin.priceUsd)
            };
            setPortfolioCoin(portfolioCoin)
        }
    }, [selectedCoin]);

    const fetchPageCoins = useCallback(async (page: number) => {
        offset = (page - 1) * 10;
        const coins = await fetchCoins(offset, 10);
        setFilteredCoins(coins);
    }, []);

    const onClose = useCallback(() => {
        setOpenModal(false);
        setSelectedCoin(null);
        setPortfolioCoin(null);
    }, []);
   

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
