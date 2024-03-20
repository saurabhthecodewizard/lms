import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommonButton from './CommonButton';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

interface AcadiaModalProps {
    open: boolean;
    onModalClose: () => void;
    headerText?: string;
    children: React.ReactNode;
    primaryButtonText?: string;
    onPrimaryAction?: () => void;
    onCancel?: () => void;
}

const AcadiaModal: React.FC<AcadiaModalProps> = (props) => {
    const { open, onModalClose, headerText = 'Are you sure?', children, primaryButtonText = 'Submit', onPrimaryAction, onCancel } = props;


    return (
        <Modal
            open={open}
            onClose={onModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='bg-slate-50 dark:bg-slate-900 flex flex-col gap-4'>
                <div className='flex flex-col items-center justify-center w-full gap-2'>
                    <p className='text-lg font-bold'>{headerText}</p>
                    <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 w-full" />
                    {children}
                </div>
                <div className='flex self-end items-end justify-end gap-2'>
                    <CommonButton onClick={onPrimaryAction} theme='solid'>{primaryButtonText}</CommonButton>
                    <CommonButton onClick={onCancel ?? onModalClose} theme='outline'>Cancel</CommonButton>
                </div>
            </Box>
        </Modal>
    );
}

export default AcadiaModal;