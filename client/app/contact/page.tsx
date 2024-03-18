"use client"
import React from 'react';
import Navbar from '../_components/_navbar/Navbar';
import Footer from '../_components/_footer/Footer';
import CommonInput from '@/components/common/CommonInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CommonTextArea from '@/components/common/CommonTextArea';
import CommonButton from '@/components/common/CommonButton';
import { GrMapLocation } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email!').required('Please enter your email'),
    message: Yup.string().required('Message is required'),
});

const Page: React.FC = () => {
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: schema,
        onSubmit: () => { },
    });
    return (
        <main className='w-full h-screen flex flex-col'>
            <Navbar />
            <div className='px-8 sm:px-20 md:px-28 xl:px-96 h-screen flex flex-col flex-grow gap-4 items-center bg-gradient-to-br from-slate-400 to-slate-50 dark:from-slate-500 dark:to-slate-950 overflow-auto'>
                <p className='mt-28 sm:mt-40 text-5xl text-orange-500'>CONTACT US</p>
                <div className='mb-80 flex flex-col items-center gap-4 w-full px-8'>
                    <div className='mb-12 flex flex-col items-start justify-center gap-2 shadow-2xl p-4'>
                        <div className='flex items-center justify-center gap-2'>
                            <GrMapLocation className='text-orange-500' />
                            <p className='text-base'>Pune, India</p>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <FaPhoneAlt className='text-orange-500' />
                            <p className='text-base'>+91-75034-98343</p>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <MdEmail className='text-orange-500' />
                            <a href='mailto:opuscorppune@gmail.com' className='text-base mb-1'>opuscorppune@gmail.com</a>
                        </div>
                    </div>
                    <form className='w-full'>
                        <CommonInput
                            id='name'
                            placeholder='John Doe'
                            value={values.name}
                            errors={errors.name}
                            showError={touched.name}
                            label='Full Name'
                            type='text'
                            onChange={handleChange}
                            required
                        />
                        <CommonInput
                            id='email'
                            placeholder='johndoe@gmail.com'
                            value={values.email}
                            errors={errors.email}
                            showError={touched.email}
                            label='Email'
                            type='email'
                            onChange={handleChange}
                            required
                        />
                        <CommonTextArea
                            id='message'
                            value={values.message}
                            placeholder="What's on your mind?"
                            label='Message'
                            errors={errors.message}
                            onChange={handleChange}
                            showError={touched.message}
                            required
                        />
                    </form>
                    <CommonButton theme='solid' rounded='full' onClick={handleSubmit}>Submit</CommonButton>
                </div>
            </div>
            <Footer />
        </main>
    )
};

export default Page;