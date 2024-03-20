'use client'
import React from 'react';
import Dashboard from './_components/Dashboard';

const Page: React.FC = () => {
    return (
        <div className='h-full flex flex-col gap-8 items-center'>
            <p className='text-3xl font-bold'>Available Courses</p>
            <Dashboard />
        </div>
    )
};

export default Page;