'use client'
import React from 'react';
import AllCourses from './_components/AllCourses';

const Page: React.FC = () => {
    return (
        <div className='h-full flex flex-col items-center gap-8'>
            <p className='text-3xl font-bold'>All Published Courses</p>
            <AllCourses />
        </div>
    )
};

export default Page;