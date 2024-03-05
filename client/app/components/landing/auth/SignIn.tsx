'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormProp from './types/formProp.interface'
import { Box, Typography } from '@mui/material'
import CurrentForm from './enums/currentForm.enum';
import Image from 'next/image';
import AcadiaLogoSmall from '../../common/AcadiaLogoSmall';
import CommonButton from '../../common/CommonButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import CommonInput from '../../common/CommonInput';
import CommonPasswordInput from '../../common/CommonPasswordInput';

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
})

const SignIn: React.FC<FormProp> = (props) => {
    const { onChangeForm } = props;
    const { touched, errors, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log(email);
            console.log(password);
        }
    });

    const onChangeFormHandler = React.useCallback(() => {
        onChangeForm(CurrentForm.SIGN_UP);
    }, [onChangeForm]);
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

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <button onClick={onChangeFormHandler} className="font-semibold leading-6 text-orange-500 hover:text-orange-600">Sign up</button>
                    </p>
                </div>
            </div>
        </Box>
    )
}

export default SignIn