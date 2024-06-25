//modal component with modal from antd
import React from 'react';
import { Modal } from 'antd';
import {CoinData, portfolioCoin} from "../utils/types";

interface ModalProps {
    open?: boolean;
    onClose?: () => void;
    onConfirm?: (coin?: portfolioCoin) => void;
    title?: string;
    children?: React.ReactNode;
}

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