import React from 'react';
import { Button as AntdButton } from 'antd';

// import { ButtonProps } from 'antd/es/button';
// import './Button.css';
import { ButtonProps } from '../utils/types';
const Button: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} />;
};

export default Button;