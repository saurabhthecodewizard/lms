'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormProp from './types/formProp.interface'
import { Box } from '@mui/material'
import CurrentForm from './enums/currentForm.enum';
import CommonButton from '../../common/CommonButton';
import { AiFillGithub,  } from 'react-icons/ai';
import CommonInput from '../../common/CommonInput';
import CommonPasswordInput from '../../common/CommonPasswordInput';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import AcadiaLogoSmall from '@/components/common/AcadiaLogoSmall';

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
})

const SignIn: React.FC<FormProp> = (props) => {
    const { onChangeForm } = props;
    const [login, { isSuccess, error, data }] = useLoginMutation();
    const { touched, errors, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        }
    });

    const onChangeFormHandler = React.useCallback(() => {
        onChangeForm(CurrentForm.SIGN_UP);
    }, [onChangeForm]);

    React.useEffect(() => {
        if (isSuccess) {
            const message = data?.message || 'Login Successful!'
            toast.success(message);
            onChangeForm(CurrentForm.NONE);
        }
        if (error && 'data' in error) {
            toast.error((error.data as any).message);
        }
    }, [data?.message, error, isSuccess, onChangeForm]);

    return (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[500px] bg-slate-200 dark:bg-slate-800 border-1 border-black shadow-md p-4 rounded-xl'>
            <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                    <AcadiaLogoSmall />
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <CommonInput
                            id="email"
                            type="email"
                            label='Email Address'
                            value={values.email}
                            onChange={handleChange}
                            autoComplete="email"
                            placeholder='mail@mail.com'
                            required
                            errors={errors.email}
                            showError={touched.email}
                        />

                        <CommonPasswordInput
                            label='Password'
                            value={values.password}
                            onChange={handleChange}
                            errors={errors.password && touched.password ? errors.password : ''}
                        />

                        <CommonButton type='submit' className='w-full rounded-3xl' theme='solid'>
                            Sign In
                        </CommonButton>
                    </form>

                    <div className='flex flex-col items-center justify-center mt-4 gap-2'>
                        <p className='text-center text-sm text-gray-500'>
                            Or Sign In with
                        </p>
                        <div className='flex items-center justify-center gap-3 mt-2'>
                            <Link href='http://localhost:8000/auth/google' className='flex items-center justify-center'>
                                <FcGoogle size={30} className='cursor-pointer' />
                            </Link>
                            <Link href='http://localhost:8000/auth/github' className='flex items-center justify-center'>
                                <AiFillGithub size={30} className='cursor-pointer' />
                            </Link>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <button onClick={onChangeFormHandler} className="font-semibold leading-6 text-orange-500 hover:text-orange-600">Sign up</button>
                    </p>
                </div>
            </div>
        </Box>
    )
}

export default SignIn