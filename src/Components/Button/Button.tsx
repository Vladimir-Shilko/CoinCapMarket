import React from 'react';
import { Button as AntdButton } from 'antd';
import {ButtonProps} from 'antd'
const Button: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} />;
};

export default Button;