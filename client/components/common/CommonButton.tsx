import React from 'react';
import { ImSpinner } from 'react-icons/im';

interface CommonButtonProps {
    theme: 'solid' | 'outline';
    type?: 'submit';
    children: React.ReactNode;
    isValid?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    rounded?: 'full' | 'lg'
    onClick?: () => void;
}

const CommonButton: React.FC<CommonButtonProps> = (props) => {
    const { theme, type, className, children, disabled, isValid = true, loading = false, rounded = 'lg', onClick } = props;
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading || !isValid}
            className={`px-3 py-2 border border-orange-500 whitespace-nowrap rounded-${rounded} ${theme === 'solid' ? 'bg-orange-500 hover:bg-orange-600 ' : 'text-orange-500 hover:bg-orange-500 hover:text-gray-900 hover:dark:text-gray-200 '} ${className} ${loading || !isValid ? 'opacity-60' : ''}`}
        >
            <div className='flex items-center justify-center gap-1'>
                {children}
                {loading && <ImSpinner className='animate-spin' />}
            </div>
        </button>
    )
}

export default CommonButton;