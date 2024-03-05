import { Modal } from '@mui/material';
import React from 'react'
import FormProp from './types/formProp.interface';
import CurrentForm from './enums/currentForm.enum';

type CommonModalProps = {
    modalOpen: boolean;
    onModalClose: () => void;
    component: React.FC<FormProp>;
    onChangeForm: (selected: CurrentForm) => void;
}

const FormModal: React.FC<CommonModalProps> = (props) => {
    const { modalOpen, onModalClose, onChangeForm, component: Component } = props;
    return (
        <Modal
            keepMounted
            open={modalOpen}
            onClose={onModalClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Component onChangeForm={onChangeForm} />
        </Modal>
    )
}

export default FormModal;