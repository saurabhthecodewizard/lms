"use client"
import React from 'react';
import Navbar from '../_components/_navbar/Navbar';
import Footer from '../_components/_footer/Footer';

const Page: React.FC = () => {
  return (
    <main className='w-full h-screen flex flex-col'>
      <Navbar />
      <div className='px-8 sm:px-20 md:px-28 xl:px-96 h-screen flex flex-col flex-grow gap-4 items-center bg-gradient-to-br from-slate-400 to-slate-50 dark:from-slate-500 dark:to-slate-950 overflow-auto'>
        <p className='mt-28 sm:mt-40 text-5xl text-orange-500'>ABOUT US</p>
        <div className='mb-80 flex flex-col items-center gap-4 w-full px-8'>
          <p className='text-base font-Poppins w-full text-justify'>
            Welcome to Acadia, your comprehensive learning management system designed
            to facilitate seamless educational experiences for students and educators alike.
            Acadia empowers institutions, instructors, and learners by providing a
            robust platform for course delivery, collaboration, and assessment.
            <br />
            <br />
            At Acadia, our mission is to transform the way knowledge is shared and acquired,
            fostering a dynamic and engaging learning environment that transcends traditional boundaries.
            With our intuitive interface and innovative features, we strive to inspire curiosity,
            spark creativity, and promote lifelong learning.
            <br />
            <br />
          </p>
          <ul className='list-disc font-Poppins w-full text-justify'>
            <li>
              Our user-friendly interface ensures ease of navigation, allowing both instructors and
              learners to access course materials, assignments, and communication tools with ease.
            </li>
            <li>
              Acadia offers powerful tools for course creation, organization, and delivery.
              Instructors can upload course materials, create interactive quizzes and assignments,
              and track student progress efficiently.
            </li>
            <li>
              Facilitating collaboration is at the heart of Acadia. Our platform enables seamless
              communication and collaboration among students and instructors through discussion forums,
              messaging features, and group activities.
            </li>
            <li>
              Our dedicated support team is committed to providing prompt assistance and resolving
              any issues or concerns you may encounter. Whether you need technical support or
              guidance on using Acadia effectively, we are here to help.
            </li>
          </ul>
          <br />
          <p className='text-base font-Poppins w-full text-justify'>
            Join the Acadia community today and embark on a journey of discovery, growth, and achievement.
            Experience the power of modern education technology with Acadia, where learning knows no bounds.
          </p>
          <br />
          <br />
          <div className='flex flex-col self-start'>
            <p className='text-lg font-semibold font-Poppins'>Founder & CEO of Acadia</p>
            <p className='text-lg font-bold font-Poppins text-orange-500'>Saurabh Mahajan</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
};

export default Page;