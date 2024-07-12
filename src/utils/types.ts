//use types.ts file to define types and interfaces that are used in multiple components
import React from "react";

export interface CoinData {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    supply: string;
    maxSupply: string;
    explorer: string;
    logoUrl: string;
    logoFile?: string;
}
export interface portfolioCoin {
    uniqueId?: string;
    id: string;
    amount: number;
    priceUsd: number;
    //another fields are not required
    rank?: string;
    symbol?: string;
    name?: string;
    marketCapUsd?: string;
    volumeUsd24Hr?: string;
    changePercent24Hr?: string;
    vwap24Hr?: string;
    supply?: string;
    maxSupply?: string;
    explorer?: string;
    logoUrl?: string;


}
export interface CoinHistory {
    priceUsd: string;
    time: number;
}
export interface PriceChartProps {
    symbol: string;
    interval: string;
}
export interface ButtonProps {
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
    size?: 'large' | 'middle' | 'small';
    danger?: boolean;
    disabled?: boolean;
    loading?: boolean | { delay?: number };
    icon?: React.ReactNode;
    shape?: 'circle' | 'round';
    block?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    htmlType?: 'button' | 'submit' | 'reset';
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;

}
export interface CoinRowProps {
    coin: CoinData;
    onAddToPortfolio: (coin: CoinData) => void;
}
export interface ColumnsType<T> {
    title: string;
    dataIndex?: keyof T;
    key: string;
    render?: (text: string, record: T, index: number) => React.ReactNode;
    defaultSortOrder?: 'ascend' | 'descend';
    sorter?: (a: T, b: T) => number;
    //add sorters

}
export interface InputRef {
    select: () => void;


}
export interface CoinTableProps {
    coins: CoinData[];
    onAddToPortfolio: (coin: CoinData) => void;
    handleFilter: (search: string) => void;
    fetchPageCoins: (page: number) => void;
}
export interface ErrorMessageProps {
    message?: string;
}
export interface InputNumberProps {
    placeholder?: string;
    min?: number;
    max?: number;
    onChange?: (value: number ) => void;
    onEnter?: () => void;
    children?: React.ReactNode[];
    type?: string;
}
export interface InputTextProps {
    placeholder?: string;
    onChange?: (value: string ) => void;
    onEnter?: () => void;
    children?: React.ReactNode[];
    type?: string;
}
export interface ModalProps {
    open?: boolean;
    onClose?: () => void;
    onConfirm?: (coin?: portfolioCoin) => void;
    title?: string;
    children?: React.ReactNode;
}
export interface PaginationProps {
    defaultCurrent?: number;
    total?: number;
    onChange?: (page: number) => void;
}