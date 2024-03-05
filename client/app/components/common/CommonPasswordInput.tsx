import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface CommonPasswordInputProps {
    label?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    errors: string
}

const CommonPasswordInput: React.FC<CommonPasswordInputProps> = (props) => {
    const { label, value, onChange, errors } = props;
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const onClickShowPassword = React.useCallback(() => setShowPassword(!showPassword), [showPassword]);
    return (
        <div>
            {label && <label
                htmlFor="password"
                className="block text-sm font-medium leading-6">
                {label}
            </label>}
            <div className="mt-1 relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    autoComplete="current-password"
                    placeholder='password'
                    required
                    className={`${errors.length && 'border-red-500'} block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {
                    showPassword ? (
                        <AiOutlineEye
                            className='absolute bottom-2 right-2 z-1 cursor-pointer'
                            size={20}
                            onClick={onClickShowPassword}
                        />
                    ) : (
                        <AiOutlineEyeInvisible
                            className='absolute bottom-2 right-2 z-1 cursor-pointer'
                            size={20}
                            onClick={onClickShowPassword}
                        />
                    )
                }
            </div>
            {!!errors.length &&
                <span className='text-red-500 pt-1 block'>
                    {errors}
                </span>}
        </div>
    )
}

export default CommonPasswordInput