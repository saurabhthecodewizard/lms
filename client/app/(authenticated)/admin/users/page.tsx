"use client"
import React from 'react';
import UsersGrid from './_components/UsersGrid';

const Page: React.FC = () => {
    return (
        <div className='h-full flex flex-col gap-8 items-center'>
            <p className='text-3xl font-bold'>Users Grid</p>
            <UsersGrid />
        </div>
    )
};

export default Page;