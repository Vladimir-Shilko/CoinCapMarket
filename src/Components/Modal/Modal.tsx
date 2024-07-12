//modal component with modal from antd
import React from 'react';
import { Modal } from 'antd';
import { ModalProps} from "../../utils/types";

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
            onOk={()=> onConfirm ? onConfirm() : console.log('no onConfirm')}

        >
            {children}
        </Modal>
    );
};

export default CustomModal;