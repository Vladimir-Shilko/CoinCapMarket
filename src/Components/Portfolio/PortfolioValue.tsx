import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
//import css file
import '../../styles/portfolio.css';
import {fetchPortfolioValue} from "../../services/api";
import {CoinData, portfolioCoin} from "../../utils/types";
import Modal from '../Modal'

const PortfolioValue: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [diff, setDiff] = useState<number>(0.00);
    const [percentageChange, setPercentageChange] = useState<string>('0.00');
    // const [portfolioValue, setPortfolioValue] = useState<number>(0.00);
    let portfolio : portfolioCoin[] = JSON.parse(localStorage.getItem('portfolio') || '[]');

    console.log('portfoliodd: '+portfolio);
    //fix problem with parsing when portfolio is [Object object], [Object object] instead of array


    let portfolioValue = 0.00;
    //if portfolio is empty, set value to 0
    if(portfolio.length === 0){
        portfolioValue = 0.00;
    }
    else {
        portfolioValue = Number.parseFloat(portfolio.reduce((acc: number, coin: portfolioCoin) => acc + coin.amount * coin.priceUsd, 0).toFixed(2));
        // setPortfolioValue(_portfolioValue);
    }
    const substract = (a: number, b: number) => a - b;
    //get substract betweean portfolioValue and current value of coins from API
    //get actual value of coins from API which is stored in localStorage
    console.log('portfolio2: '+portfolio.length);
    const { data, isLoading } = useQuery<number>('portfolioValue', () => fetchPortfolioValue(portfolio), {
        enabled: !!portfolio.length,
    });

    //when data is loaded, calculate difference between portfolioValue and current value of coins
    useEffect(() => {
            console.log('data: '+data);
            const actualValue : number | undefined = data;
            let diff = 0.00;
            let percentageChange: string = '0.00';
            console.log('act '+actualValue)
            if(actualValue !== undefined && actualValue !== null && actualValue !== NaN){
                diff = Number.parseFloat(substract(actualValue, portfolioValue).toFixed(2))
                percentageChange = (diff / portfolioValue * 100).toFixed(2);
            }
            console.log("d "+diff)
            console.log('p '+percentageChange)
            setDiff(diff);
            setPercentageChange(percentageChange);
        }
        , [data]);
    // const actualValue = data;
    // let diff = 0.00;
    // let percentageChange: string = '0.00';
    // console.log(actualValue)
    // if(actualValue !== undefined && actualValue !== null && actualValue !== NaN){
    //     diff = substract(Number.parseFloat(actualValue), portfolioValue)
    //     percentageChange = (diff / portfolioValue * 100).toFixed(2);
    // }

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
            <Modal title={'Портфель'} open={isModalVisible} onClose={handleCancel} >
                <ul>
                    {portfolio.map((coin: portfolioCoin ) => (
                        <li key={coin.symbol}>{coin.symbol}: {coin.amount} монет, купленных по цене {coin.priceUsd}
                            <button onClick={() => {
                                //delete coin from portfolio
                                const newPortfolio : portfolioCoin[] = portfolio.filter((c: portfolioCoin) => c.uniqueId !== coin.uniqueId);
                                localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
                                window.location.reload();
                            }}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </Modal>

            {/*<Modal title="Портфель"  open={isModalVisible} onCancel={handleCancel} onOk={handleCancel}>*/}
            {/*    <ul>*/}
            {/*        {portfolio.map((coin: portfolioCoin ) => (*/}
            {/*            <li key={coin.symbol}>{coin.symbol}: {coin.amount} монет, купленных по цене {coin.priceUsd}*/}
            {/*                <button onClick={() => {*/}
            {/*                    //delete coin from portfolio*/}
            {/*                    const newPortfolio : portfolioCoin[] = portfolio.filter((c: portfolioCoin) => c.uniqueId !== coin.uniqueId);*/}
            {/*                    localStorage.setItem('portfolio', JSON.stringify(newPortfolio));*/}
            {/*                    window.location.reload();*/}
            {/*                }}>Удалить</button>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</Modal>*/}
        </>
    );
};

export default PortfolioValue;
