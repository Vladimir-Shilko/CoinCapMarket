import React from 'react';
import {CoinData, CoinRowProps} from '../../utils/types';

const CoinRow: React.FC<CoinRowProps> = ({ coin , onAddToPortfolio }) => {
    return (
        <tr>
            <td>{coin.symbol}</td>

            <td><img src={coin.logoUrl} alt="logo" width="32" /></td>
            <td>{Number.parseFloat(coin.priceUsd).toFixed(2)}</td>
            <td>{Number.parseFloat(coin.marketCapUsd.toLocaleString()).toFixed(2)}</td>
            <td>{Number.parseFloat(coin.changePercent24Hr).toFixed(2)}%</td>
            <td><button onClick={(event) => {event.stopPropagation();onAddToPortfolio(coin)}}>Add</button></td>
        </tr>
    );
};

export default CoinRow;