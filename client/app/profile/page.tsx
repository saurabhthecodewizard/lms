"use client"
import React from 'react';
import Protected from '../hooks/useProtected';

const Page: React.FC = () => {
    return (
        <Protected>
            <main className='w-full h-screen'>
                PROFILE
            </main>
        </Protected>
    )
};

export default Page;