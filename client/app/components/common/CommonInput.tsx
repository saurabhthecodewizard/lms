import React from 'react';

interface CommonInputProps {
    id: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    value: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    autoComplete?: React.HTMLInputAutoCompleteAttribute;
    placeholder: string;
    required?: boolean;
    showError?: boolean;
    errors?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const CommonInput: React.FC<CommonInputProps> = (props) => {
    const { id, label, type, value, onChange, autoComplete, placeholder, required, showError, errors, labelClassName, inputClassName } = props;
    return (
        <div>
            <label
                htmlFor={id}
                className={`block text-sm font-medium leading-6 ${labelClassName}`}>
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    required={required}
                    className={`${showError && errors && 'border-red-500'} block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputClassName}`} />
            </div>
            {showError && errors &&
                <span className='text-red-500 pt-1 block'>
                    {errors}
                </span>}
        </div>
    )
}

export default CommonInput