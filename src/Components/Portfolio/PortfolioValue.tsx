import React, {useEffect, useState} from 'react';
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
    const portfolio : portfolioCoin[] = JSON.parse(localStorage.getItem('portfolio') || '[]');
    console.log('portfoliodd: '+portfolio);
    let portfolioValue = 0.00;
    if(portfolio.length === 0){
        portfolioValue = 0.00;
    }
    else {
        portfolioValue = Number.parseFloat(portfolio.reduce((acc: number, coin: portfolioCoin) => acc + coin.amount * coin.priceUsd, 0).toFixed(2));
    }
    const substract = (a: number, b: number) => a - b;
    console.log('portfolio2: '+portfolio.length);
    const { data, isLoading } = useQuery<number>('portfolioValue', () => fetchPortfolioValue(portfolio), {
        enabled: !!portfolio.length,
    });
    useEffect(() => {
            console.log('data: '+data);
            const actualValue : number | undefined = data;
            let diff = 0.00;
            let percentageChange: string = '0.00';
            console.log('act '+actualValue)
            if(actualValue !== undefined && actualValue !== null ){
                diff = Number.parseFloat(substract(actualValue, portfolioValue).toFixed(2))
                percentageChange = (diff / portfolioValue * 100).toFixed(2);
            }
            console.log("d "+diff)
            console.log('p '+percentageChange)
            setDiff(diff);
            setPercentageChange(percentageChange);
        }
        , [data]);

    const handleClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
                                <Button onClick={() => {
                                    const newPortfolio: portfolioCoin[] = portfolio.filter((c: portfolioCoin) => c.uniqueId !== coin.uniqueId);
                                    localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
                                    window.location.reload();
                                }}>Удалить</Button>
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
