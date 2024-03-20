'use client'
import React from 'react';
import Analytics from './_components/Analytics';

const Page: React.FC = () => {
    return (
        <div>
            <p className='text-3xl font-bold w-full text-center mb-4'>Platform Logs</p>
            <Analytics />
        </div>
    )
};

export default Page;