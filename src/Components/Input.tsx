//create an imput for choose amount of coins to buy and add to portfolio with validation min max
import React, { useState } from 'react';
import { InputNumber} from "antd";
import { InputNumberProps } from 'antd/lib/input-number';
import { portfolioCoin } from '../utils/types';
import {usePortfolio} from "../pages";

interface InputProps {
    placeholder?: string;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
    children?: Record<string, any>[];
}

const CustomInput: React.FC<InputProps> = ({  placeholder, min, max, onChange }) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const coin = usePortfolio();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Number(e.target.value);
        if (min && newValue < min) {
            setValue(min);
        } else if (max && newValue > max) {
            setValue(max);
        } else {
            setValue(newValue);
        }
        if (onChange) {
            onChange(newValue);
        }
    }
    // const onChanged: InputNumberProps<InputProps>['onChange'] = (value) => {
    //     console.log('changed', value);
    // };

    // @ts-ignore
    return (
        <div>
            <p>{placeholder}</p>
            <input min = {min} max={max} defaultValue={0} type='number' onChange={handleChange}/>
        </div>
    );
};

export default CustomInput;