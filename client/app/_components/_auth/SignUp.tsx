import React from 'react'
import FormProp from './types/formProp.interface'
import { Box } from '@mui/material'
import CurrentForm from './enums/currentForm.enum';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CommonInput from '../../../components/common/CommonInput';
import CommonPasswordInput from '../../../components/common/CommonPasswordInput';
import CommonButton from '../../../components/common/CommonButton';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import AcadiaLogoSmall from '@/components/common/AcadiaLogoSmall';

const schema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
})

const SignUp: React.FC<FormProp> = (props) => {
    const { onChangeForm } = props;
    const [register, { data, error, isSuccess }] = useRegisterMutation();
    const { touched, errors, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async ({ firstName, lastName, email, password }) => {
            const data = { firstName, lastName, email, password };
            await register(data);
        }
    });

    const onChangeFormHandler = React.useCallback(() => {
        onChangeForm(CurrentForm.SIGN_IN);
    }, [onChangeForm]);

    React.useEffect(() => {
        if (isSuccess) {
            const message = data?.message || 'Registration Successful!'
            toast.success(message);
            onChangeForm(CurrentForm.VERIFICATION);
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
                        Sign up for Acadia
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <CommonInput
                            id="firstName"
                            type="text"
                            label='First Name'
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder='John'
                            required
                            errors={errors.firstName}
                            showError={touched.lastName}
                        />

                        <CommonInput
                            id="lastName"
                            type="text"
                            label='Last Name'
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder='Doe'
                            required
                            errors={errors.lastName}
                            showError={touched.lastName}
                        />

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
                            Sign up
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

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <button onClick={onChangeFormHandler} className="font-semibold leading-6 text-orange-500 hover:text-orange-600">Sign in</button>
                    </p>
                </div>
            </div>
        </Box>
    )
}

export default SignUp