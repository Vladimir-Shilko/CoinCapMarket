//modal component with modal from antd
import React from 'react';
import { Modal } from 'antd';
import {CoinData, ModalProps, portfolioCoin} from "../utils/types";

const CustomModal: React.FC<ModalProps> = ({ open, onClose, onConfirm, title, children }) => {
    function handleCancel() {
        if (onClose) {
            onClose();
        }
    }
    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            onOk={onConfirm}

        >
            {children}
        </Modal>
    );
};

export default CustomModal;