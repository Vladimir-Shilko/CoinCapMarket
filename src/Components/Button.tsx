import React from 'react';
import { Button as AntdButton } from 'antd';

// import { ButtonProps } from 'antd/es/button';
// import './Button.css';
interface ButtonProps {
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
const Button: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} />;
};

export default Button;