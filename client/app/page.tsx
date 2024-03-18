"use client"
import React from 'react';
import Navbar from './_components/_navbar/Navbar';
import CommonButton from '@/components/common/CommonButton';
import Footer from './_components/_footer/Footer';

const Page: React.FC = () => {
  return (
    <main className='w-full h-screen flex flex-col'>
      <Navbar />
      <div className='h-screen flex flex-col flex-grow gap-4 items-center justify-center bg-gradient-to-br from-slate-400 to-slate-50 dark:from-slate-500 dark:to-slate-950'>
        <p className='text-5xl text-center font-Poppins px-8 sm:px-24'>
          Unlocking Potential Through Seamless<strong className='text-orange-500 text-5xl'> Learning</strong>
        </p>
        <p className='text-lg text-center font-Poppins px-10 sm:px-28'>
          Discover a world of endless possibilities with our Learning Management System, designed to empower learners of all ages to explore, engage, and excel
        </p>
        <CommonButton theme='solid' rounded='full'>
          Explore the courses
        </CommonButton>
      </div>
      <Footer />
    </main>
  )
};

export default Page;