import CourseRating from '@/components/common/features/CourseRating';
import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { FaList } from 'react-icons/fa6';

export interface CourseCardProps {
    title: string;
    image: StaticImageData;
    rating: number;
    reviews: number;
    price: number;
    estimatedPrice: number;
    noOfLectures: number;
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
    const { title, image, rating, reviews, price, estimatedPrice, noOfLectures } = props;
    return (
        <div className='w-80 flex flex-col items-start gap-2 shadow-2xl p-4'>
            <Image
                src={image}
                alt='Data Science'
                width={0}
                height={0}
                className='object-contain w-80'
            />
            <p className='text-base font-bold'>{title}</p>
            <CourseRating rating={rating} reviews={reviews} />
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='text-xl font-bold'>€{price}</p>
                    <p className='text-sm line-through'>€{estimatedPrice}</p>
                    <p>{Math.round(((estimatedPrice - price) / estimatedPrice) * 100)}% OFF</p>
                </div>
                <div className='flex items-center justify-end gap-1'>
                    <FaList />
                    <p className='text-base mb-1'>{`${noOfLectures} Lectures`}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;