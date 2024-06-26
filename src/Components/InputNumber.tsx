//create an imput for choose amount of coins to buy and add to portfolio with validation min max
import React, { useState } from 'react';
import { InputNumber} from "antd";
// import { InputNumberProps } from 'antd/lib/input-number';
import {InputNumberProps, portfolioCoin} from '../utils/types';
import {usePortfolio} from "../pages";
import '../styles/Input.css'


const CustomInput: React.FC<InputNumberProps> = ({ placeholder, min, max, onChange }) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const coin = usePortfolio();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Number(e.target.value);
        // if (min && newValue < min) {
        //     setValue(min);
        // } else if (max && newValue > max) {
        //     setValue(max);
        // } else {
        //     setValue(newValue);
        // }
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    }
    // const onChanged: InputNumberProps<InputProps>['onChange'] = (value) => {
    //     console.log('changed', value);
    // };


    return  (

        <div>
            <p>{placeholder}</p>
            <input type="number"
                   defaultValue={1}
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default CustomInput;