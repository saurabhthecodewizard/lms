"use client"
import React from 'react';
import Header from './utils/Header';
import Navbar from './components/landing/navbar/Navbar';

interface PageProps {

}

const Page: React.FC<PageProps> = (props) => {
  return(
    <div className='w-full h-screen'>
      <Header />
      <Navbar />
    </div>
  )
};

export default Page;