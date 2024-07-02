//create an imput for choose amount of coins to buy and add to portfolio with validation min max
import React, {useEffect, useState} from 'react';
import { InputNumber} from "antd";
// import { InputNumberProps } from 'antd/lib/input-number';
import {InputNumberProps, portfolioCoin} from '../../utils/types';
import {usePortfolio} from "../../pages";
import '../../styles/Input.css'


const CustomInput: React.FC<InputNumberProps> = ({ placeholder, min, max, onChange }) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const coin = usePortfolio();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        //check if value is valid
        // const isValid = e.target.validity.valid;
        // if (!isValid) {
        //     e.preventDefault()
        //     return;
        // }
        //cut 0 from start
        if(e.target.value.startsWith('0')){
            e.target.value = e.target.value.slice(1);
        }
        if(e.target.value === ''){
            e.target.value = '1';
        }
        console.log('changed', e.target.value);
        setValue(Number(e.target.value));
        console.log('changed', e.target.value);
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
    useEffect(() => {
        setValue(1);
    }
        , [coin]);
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