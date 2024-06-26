import React, {useState} from 'react';
import { Modal } from 'antd';
import {ErrorMessageProps} from "../../utils/types";

const ErrorMessage: React.FC<ErrorMessageProps> = (props:{message:string}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const errorMessage : string = props.message;

    const handleClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div onClick={handleClick}>
                Ошибка: {errorMessage}
            </div>
            <Modal title="Ошибка"  open={isModalVisible} onCancel={handleCancel}>
                <p>{errorMessage}</p>
            </Modal>
        </>
    );
}

export default ErrorMessage