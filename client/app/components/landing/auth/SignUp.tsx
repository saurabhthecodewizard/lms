import React from 'react'
import FormProp from './types/formProp.interface'
import { Box, Typography } from '@mui/material'
import CurrentForm from './enums/currentForm.enum';
import AcadiaLogoSmall from '../../common/AcadiaLogoSmall';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CommonInput from '../../common/CommonInput';
import CommonPasswordInput from '../../common/CommonPasswordInput';
import CommonButton from '../../common/CommonButton';

const schema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
})

const SignUp: React.FC<FormProp> = (props) => {
    const { onChangeForm } = props;
    const { touched, errors, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ firstName, lastName, email, password }) => {
            onChangeForm(CurrentForm.VERIFICATION);
        }
    });

    const onChangeFormHandler = React.useCallback(() => {
        onChangeForm(CurrentForm.SIGN_IN);
    }, [onChangeForm]);
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