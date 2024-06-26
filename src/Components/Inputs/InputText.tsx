import React from "react";
import '../../styles/Input.css'
import {InputTextProps} from "../../utils/types";

const CustomInput: React.FC<InputTextProps> = ({ placeholder,  onChange }) => {
    const Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (onChange) {
            onChange(newValue);
        }
    }
    return  (
        <div>
            <input className='input' onChange={(e) => Change(e)}
                type='text'
                placeholder={placeholder}
            />
        </div>
    );
};
export default CustomInput;