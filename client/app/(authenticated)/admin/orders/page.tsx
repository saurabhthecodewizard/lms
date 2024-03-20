"use client"
import React from 'react';
import OrdersGrid from './_components/OrdersGrid';

const Page: React.FC = () => {
    return (
        <div className='h-full flex flex-col gap-8 items-center'>
            <p className='text-3xl font-bold'>Invoices</p>
            <OrdersGrid />
        </div>
    )
};

export default Page;