import React from 'react';

interface CommonButtonProps {
    theme: 'solid' | 'outline';
    type?: 'submit';
    children: React.ReactNode;
    className?: string;
    rounded?: 'full' | 'lg'
    onClick?: () => void;
}

const CommonButton: React.FC<CommonButtonProps> = (props) => {
    const { theme, type, className, children, rounded = 'lg', onClick } = props;
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-3 py-2 border border-orange-500 whitespace-nowrap rounded-${rounded} ${theme === 'solid' ? 'bg-orange-500 hover:bg-orange-600 ' : 'text-orange-500 hover:bg-orange-500 hover:text-gray-900 hover:dark:text-gray-200 '} ${className}`}
        >
            {children}
        </button>
    )
}

export default CommonButton;