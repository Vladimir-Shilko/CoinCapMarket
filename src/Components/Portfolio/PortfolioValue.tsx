import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useQuery} from "react-query";
import './portfolio.scss';
import {fetchPortfolioValue} from "../../services/api";
import { portfolioCoin} from "../../utils/types";
import Modal from '../Modal/Modal'
import Button from "../Button/Button";

const PortfolioValue: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [diff, setDiff] = useState<number>(0.00);
    const [percentageChange, setPercentageChange] = useState<string>('0.00');

    const portfolio : portfolioCoin[] = useMemo(() => {
        return JSON.parse(localStorage.getItem('portfolio') || '[]');
    }, [isModalVisible]);

    const calculatePortfolioValue = useCallback(() => {
        if(portfolio.length === 0){
            return 0.00;
        }
        return Number.parseFloat(portfolio.reduce((acc: number, coin: portfolioCoin) => acc + coin.amount * coin.priceUsd, 0).toFixed(2));
    }, [portfolio]);

    const portfolioValue = useMemo(() => calculatePortfolioValue(), [calculatePortfolioValue]);

    const substract = useCallback((a: number, b: number) => a - b, []);

    const { data, isLoading } = useQuery<number>('portfolioValue', () => fetchPortfolioValue(portfolio), {
        enabled: !!portfolio.length,
    });

    useEffect(() => {
        if(data !== undefined && data !== null ){
            const actualValue : number = data;
            const diff = Number.parseFloat(substract(actualValue, portfolioValue).toFixed(2));
            const percentageChange = (diff / portfolioValue * 100).toFixed(2);
            setDiff(diff);
            setPercentageChange(percentageChange);
        } else {
            setDiff(0.00);
            setPercentageChange('0.00');
        }
    }, [data, substract, portfolioValue]);

    const handleClick = useCallback(() => {
        setIsModalVisible(true);
    }, []);

    const handleCancel = useCallback(() => {
        setIsModalVisible(false);
    }, []);

    const handleDelete = useCallback((uniqueId: string | undefined) => {
        const newPortfolio: portfolioCoin[] = portfolio.filter((c: portfolioCoin) => c.uniqueId !== uniqueId);
        localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
        window.location.reload();
    }, [portfolio]);
    

    return (
        <>
            <div className='portfolio' onClick={handleClick}>
                Портфель: {portfolioValue} USD {(isLoading)? '...' : `${diff} (${percentageChange}%)` }
            </div>
            <Modal title={'Портфель'} open={isModalVisible} onClose={handleCancel} onConfirm={handleCancel} >
                <table>
                    <thead>
                    <tr>
                        <th>Символ</th>
                        <th>Количество</th>
                        <th>Цена (USD)</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {portfolio.map((coin: portfolioCoin) => (
                        <tr key={coin.uniqueId}>
                            <td>{coin.symbol}</td>
                            <td>{coin.amount}</td>
                            <td>{coin.priceUsd}</td>
                            <td>
                                <Button onClick={() => handleDelete(coin.uniqueId)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Modal>
        </>
    );
};

export default PortfolioValue;
