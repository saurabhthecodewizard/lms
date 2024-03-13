import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { PiXCircleDuotone } from 'react-icons/pi';

interface CommonFileInputProps {
    id: string;
    label: string;
    value: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    showError?: boolean;
    errors?: string;
}

const CommonFileInput: React.FC<CommonFileInputProps> = (props) => {
    const { id, setFieldValue, value, label, errors, showError } = props;
    const handleFileInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setFieldValue(id, dataUrl);
            };
        }
    }, [id, setFieldValue]);

    const handleFileDrop = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files && event.dataTransfer.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setFieldValue(id, dataUrl);
            };
        }
    }, [id, setFieldValue]);

    const handleDeleteImage = React.useCallback(() => {
        setFieldValue(id, '');
    }, [id, setFieldValue])

    return (
        <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium leading-6'>{label}</p>
            <div
                onDrop={handleFileDrop}
                onDragOver={(event) => event.preventDefault()}
                className='flex flex-col items-center justify-center text-center p-4 border-2 border-dashed gap-2 rounded-lg min-h-40'
            >
                <label htmlFor={id} className='cursor-pointer'>Drag & Drop file here or <p className='text-blue-700'>Click here</p></label>
                <br />
                <input
                    type="file"
                    id={id}
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />
                {!!value &&
                    <>
                        <PiXCircleDuotone title='Delete Image' onClick={handleDeleteImage} className='cursor-pointer' size={25} />
                        <Image height={0} width={0} src={value} alt="Preview" objectFit='contain' style={{ width: '1000px' }} />
                    </>}
            </div>
            {
                showError && errors &&
                <span className='text-red-500 pt-1 block'>
                    {errors}
                </span>
            }
        </div>
    );
};

export default CommonFileInput;
