"use client"
import React from 'react';
import Navbar from '../_components/_navbar/Navbar';
import Footer from '../_components/_footer/Footer';
import { courseCards, instructors } from '@/lib/constants';
import CourseCard from './_components/CourseCard';
import InstructorCard from './_components/InstructorCard';

const Page: React.FC = () => {
    return (
        <main className='w-full h-screen flex flex-col'>
            <Navbar />
            <div className='px-8 sm:px-20 md:px-28 xl:px-96 h-screen flex flex-col flex-grow gap-4 items-center bg-gradient-to-br from-slate-400 to-slate-50 dark:from-slate-500 dark:to-slate-950 overflow-auto'>
                <p className='mt-28 sm:mt-40 text-5xl text-orange-500'>FEATURED</p>
                <div className='mb-80 flex flex-col justify-center items-center gap-12 w-full'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='text-3xl'>Courses</p>
                        <div className='flex items-center justify-center gap-4 flex-wrap'>
                            {courseCards.map((card, index) => (
                                <CourseCard
                                    key={index}
                                    title={card.title}
                                    image={card.image}
                                    rating={card.rating}
                                    reviews={card.reviews}
                                    price={card.price}
                                    estimatedPrice={card.estimatedPrice}
                                    noOfLectures={card.noOfLectures}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='text-3xl'>Instructors</p>
                        <div className='flex items-center justify-center gap-8 flex-wrap'>
                            {instructors.map((instructor, index) => (
                                <InstructorCard
                                    key={index}
                                    name={instructor.name}
                                    position={instructor.position}
                                    picture={instructor.picture}
                                    rating={instructor.rating}
                                    reviews={instructor.reviews}
                                    students={instructor.students}
                                    courses={instructor.courses}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
};

export default Page;