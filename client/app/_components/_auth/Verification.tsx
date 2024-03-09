import React from 'react'
import FormProp from './types/formProp.interface';
import { Box } from '@mui/material';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import CommonButton from '../../../components/common/CommonButton';
import CurrentForm from './enums/currentForm.enum';
import { useActivateMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/hooks';
import AcadiaLogoSmall from '@/components/common/AcadiaLogoSmall';

type VerifyCode = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: React.FC<FormProp> = (props) => {
    const { onChangeForm } = props;
    const { token } = useAppSelector((state) => state.auth);
    const [invalid, setInvalid] = React.useState<boolean>(false);
    const [verificationCode, setVerificationCode] = React.useState<VerifyCode>({
        "0": '',
        "1": '',
        "2": '',
        "3": ''
    })
    const [inputRefs, setInputRefs] = React.useState([
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null)
    ])
    const [activate, { isSuccess, error }] = useActivateMutation();

    const onSubmitVerifyHandler = React.useCallback(async () => {
        const code = Object.values(verificationCode).join('');
        if (code.length !== 4) {
            setInvalid(true);
            return;
        }
        await activate({
            code,
            token
        })
    }, [activate, token, verificationCode]);

    const onChangeInput = React.useCallback((index: number, value: string) => {
        setInvalid(false);
        setVerificationCode((prev) => ({
            ...prev,
            [index]: value
        }));

        if (value === '' && index > 0) {
            setInputRefs((prev) => {
                prev[index - 1].current?.focus();
                return prev;
            });
        } else if (value.length === 1 && index < 3) {
            setInputRefs((prev) => {
                prev[index + 1].current?.focus();
                return prev;
            });
        }
    }, []);

    const onCodeChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInput(Number(event.currentTarget.id), event.currentTarget.value)
    }, [onChangeInput]);

    const onChangeFormHandler = React.useCallback(() => onChangeForm(CurrentForm.SIGN_IN), [onChangeForm]);

    React.useEffect(() => {
        if (isSuccess) {
            toast.success('Account Activated Successfully!');
            onChangeForm(CurrentForm.SIGN_IN);
        }
        if (error && 'data' in error) {
            toast.error((error.data as any).message);
            setInvalid(true);
        }
    }, [error, isSuccess, onChangeForm]);

    return (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[500px] bg-slate-200 dark:bg-slate-800 border-1 border-black shadow-md p-4 rounded-xl'>
            <div className="flex min-h-full flex-col items-center justify-center px-6 py-6 lg:px-8 gap-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                    <AcadiaLogoSmall />
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
                        Verify your account
                    </h2>
                </div>

                <div className='rounded-full w-fit bg-blue-500 flex items-center justify-center p-3'>
                    <VscWorkspaceTrusted size={50} />
                </div>

                <div className='flex items-center justify-around gap-2 sm:gap-10 m-auto'>
                    {
                        Object.keys(verificationCode).map((key, index) => (
                            <input
                                id={key}
                                key={key}
                                type='number'
                                ref={inputRefs[index]}
                                className={`w-16 h-16 bg-transparent border-2 rounded-xl flex items-center justify-center text-lg font-Poppins outline-none text-center ${invalid ? 'shake border-red-500' : 'border-slate-800 dark:border-slate-200'}`}
                                placeholder=''
                                maxLength={1}
                                value={verificationCode[key as keyof VerifyCode]}
                                onChange={onCodeChangeHandler}
                            />
                        ))
                    }
                </div>

                <CommonButton onClick={onSubmitVerifyHandler} className='w-full rounded-3xl' theme='solid'>
                    Verify OTP
                </CommonButton>

                <p className="text-center text-sm text-gray-500">
                    Go back to sign in?{' '}
                    <button onClick={onChangeFormHandler} className="font-semibold leading-6 text-orange-500 hover:text-orange-600">Sign in</button>
                </p>
            </div>
        </Box>
    )
}

export default Verification;