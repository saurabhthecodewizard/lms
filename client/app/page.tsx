"use client"
import React from 'react';
import Navbar from './components/landing/navbar/Navbar';
import { useAppSelector } from '@/redux/hooks';

const Page: React.FC = () => {
  return(
    <main className='w-full h-screen'>
      <Navbar />
    </main>
  )
};

export default Page;