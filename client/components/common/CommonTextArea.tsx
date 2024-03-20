import React from 'react';

interface CommonTextAreaProps {
    id: string;
    label?: string;
    value: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    autoComplete?: React.HTMLInputAutoCompleteAttribute;
    placeholder: string;
    required?: boolean;
    showError?: boolean;
    errors?: string;
    labelClassName?: string;
    inputClassName?: string;
    disabled?: boolean;
    rows?: number;
}

const CommonTextArea: React.FC<CommonTextAreaProps> = (props) => {
    const { id, label, value, onChange, autoComplete, placeholder, required, showError, errors, labelClassName, inputClassName, rows = 5, disabled } = props;
    return (
        <div className='w-full'>
            <label
                htmlFor={id}
                className={`flex items-center justify-start text-sm font-medium leading-6 ${labelClassName}`}>
                {label}
                {required && <p className='text-red-500'>*</p>}
            </label>
            <div className="mt-1">
                <textarea
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    className={`${showError && errors && 'border-red-500'} block w-full focus-visible:outline-none focus-visible:border-2 focus-visible:border-orange-500 rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputClassName}`} />
            </div>
            {
                showError && errors &&
                <span className='text-red-500 pt-1 block'>
                    {errors}
                </span>
            }
        </div>
    )
}

export default CommonTextArea;