"use client"
import React from 'react';
import Navbar from '../_components/_navbar/Navbar';
import Footer from '../_components/_footer/Footer';
import { faqs } from '@/lib/constants';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';


const Page: React.FC = () => {
  const [selectedQuestions, setSelectedQuestions] = React.useState<number[]>([]);

  const onAddSelectedQuestion = React.useCallback((event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    setSelectedQuestions((existing) => [...existing, Number(id)]);
  }, [])

  const onRemoveSelectedQuestion = React.useCallback((event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    setSelectedQuestions((existing) => existing.filter((question) => question !== Number(id)));
  }, [])

  return (
    <main className='w-full h-screen flex flex-col'>
      <Navbar />
      <div className='px-8 sm:px-20 md:px-28 xl:px-96 h-screen flex flex-col flex-grow gap-4 items-center bg-gradient-to-br from-slate-400 to-slate-50 dark:from-slate-500 dark:to-slate-950 overflow-auto'>
        <p className='mt-28 sm:mt-40 text-5xl text-orange-500'>FAQ</p>
        <div className='mb-80 flex flex-col items-center gap-4 w-full'>
          {faqs.map((faq) => (
            <div key={faq.id} className='shadow-2xl flex flex-col items-start gap-1 p-4 w-full'>
              <div className='flex justify-between items-center w-full'>
                <p className='text-lg font-semibold font-Poppins w-full'>
                  {faq.question}
                </p>
                {selectedQuestions.includes(faq.id)
                  ? <MdKeyboardArrowUp id={String(faq.id)} onClick={onRemoveSelectedQuestion} size={30} className='cursor-pointer' />
                  : <MdKeyboardArrowDown id={String(faq.id)} onClick={onAddSelectedQuestion} size={30} className='cursor-pointer' />
                }
              </div>
              {selectedQuestions.includes(faq.id) &&
                <p>
                  {faq.answer}
                </p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
};

export default Page;