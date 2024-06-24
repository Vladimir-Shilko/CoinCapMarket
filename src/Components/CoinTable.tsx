import React, { useState } from 'react';
import { Table} from 'antd';
// import { ColumnsType } from 'antd/es/table';
import { CoinData } from '../utils/types'
import Button from './Button';
//write custom ColumnsType
interface ColumnsType<T> {
    title: string;
    dataIndex?: keyof T;
    key: string;
    render?: (text: any, record: T, index: number) => React.ReactNode;
}

interface CoinTableProps {
    coins: CoinData[];
    onAddToPortfolio: (coin: CoinData) => void;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, onAddToPortfolio }) => {
    const columns: ColumnsType<CoinData>[] = [
        { title: 'Символ', dataIndex: 'symbol', key: 'symbol' },
        { title: 'Логотип', dataIndex: 'logoUrl', key: 'logo', render: (url: string | undefined) => <img src={url} alt="logo" width="32" /> },
        { title: 'Цена (USD)', dataIndex: 'priceUsd', key: 'price' },
        { title: 'Рын. капитализация (USD)', dataIndex: 'marketCapUsd', key: 'marketCap' },
        { title: 'Изм. за 24ч (%)', dataIndex: 'changePercent24Hr', key: 'change24h' },
        { title: 'Действия', key: 'action', render: (text, record) => <Button onClick={() => onAddToPortfolio(record)}>Add</Button> },
    ];

    return <Table columns={columns} dataSource={coins} pagination={{ pageSize: 10 }} />;
};

export default CoinTable;