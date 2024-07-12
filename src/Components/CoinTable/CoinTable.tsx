import React, { useState} from 'react';
import {Pagination, Table} from 'antd';
import {CoinData, CoinTableProps, ColumnsType} from '../../utils/types'
import Button from '../Button/Button';
import './Table.css';
import InputText from "../Inputs/InputText";
import ImageWithLoader from "../Image/Image";
const CoinTable: React.FC<CoinTableProps> = ({ coins, onAddToPortfolio, handleFilter, fetchPageCoins}) => {

    const handleRowClick = (record: CoinData) => {
        window.location.href = `/${record.id}`;
    };
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const ImageLoaded = ( ) => {
        setImageLoaded(true);
    }
    const columns: ColumnsType<CoinData>[] = [
        { title: 'Символ', dataIndex: 'symbol', key: 'symbol', render:(symbol: string|undefined) => <div style={{display : imageLoaded? 'block': 'none'}}>{symbol}</div>,sorter: (a: CoinData, b: CoinData) => a.symbol.localeCompare(b.symbol)},
        { title: 'Логотип', dataIndex: 'logoFile', key: 'logo', render: (url: string | undefined) => <ImageWithLoader ImageLoaded={ImageLoaded} src={url} alt="logo" width="32" /> },
        { title: 'Цена (USD)', dataIndex: 'priceUsd', key: 'price' , defaultSortOrder: 'descend', sorter: (a: CoinData, b: CoinData) => Number.parseFloat(a.priceUsd) - Number.parseFloat(b.priceUsd)},
        { title: 'Рын. капитализация (USD)', dataIndex: 'marketCapUsd', key: 'marketCap', defaultSortOrder: 'descend', sorter: (a: CoinData, b: CoinData) => Number.parseFloat(a.marketCapUsd) - Number.parseFloat(b.marketCapUsd)},
        { title: 'Изм. за 24ч (%)', dataIndex: 'changePercent24Hr', key: 'change24h', defaultSortOrder: 'descend', sorter: (a: CoinData, b: CoinData) => Number.parseFloat(a.changePercent24Hr) - Number.parseFloat(b.changePercent24Hr)},
        { title: 'Действия', key: 'action', render: (text, record) => <Button onClick={(event) => {event.stopPropagation();onAddToPortfolio(record)}}>Add</Button> },
    ];

    function InputChange( value: string) {
        console.log('value', value);
        handleFilter(value);
    
    }
    const handlePageChange = (page: number) => {
        console.log('page: ' +page.toString())
        fetchPageCoins(page);
    };

    return <>
        <InputText placeholder="Поиск" onChange={InputChange} />
        {coins?.every((coin: CoinData) => coin.logoFile === undefined) ? <div>Загрузка...</div> : (
        <Table className='table' columns={columns} dataSource={coins} pagination={false} onRow={(record: CoinData) => ({
            onClick: () => handleRowClick(record),
        })}/>)}
        <Pagination className='pagination' defaultCurrent={1} total={100} onChange={handlePageChange}/>

    </>;
};

export default CoinTable;