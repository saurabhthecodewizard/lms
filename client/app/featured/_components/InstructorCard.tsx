import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { FaPlayCircle, FaStar } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { SlBadge } from 'react-icons/sl';

export interface InstructorCardProps {
    name: string;
    position: string;
    picture: StaticImageData;
    rating: number;
    reviews: number;
    students: number;
    courses: number;
}

const InstructorCard: React.FC<InstructorCardProps> = (props) => {
    const { name, position, picture, rating, reviews, students, courses } = props;
    return (
        <div className='flex flex-col items-center justify-center shadow-2xl'>
            <div className='flex flex-col items-center justify-center mb-1'>
                <p className='text-lg text-orange-500'>{name}</p>
                <p className='text-base text-slate-500'>{position}</p>
            </div>
            <hr className="h-px bg-orange-500 border-0 w-full " />
            <div className='flex items-center justify-between p-4 gap-2'>
                <Image
                    src={picture}
                    alt={name}
                    width={0}
                    height={0}
                    className='w-40 object-contain rounded-full'
                />
                <div className='flex flex-col items-start justify-center gap-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <FaStar className='text-orange-500' />
                        <p className='text-base'>{`${rating} Rating`}</p>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <SlBadge className='text-orange-500 text-center' />
                        <p className='text-base'>{`${reviews} Reviews`}</p>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FaUsers className='text-orange-500 text-center' />
                        <p className='text-base'>{`${students} Students`}</p>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FaPlayCircle className='text-orange-500 text-center' />
                        <p className='text-base'>{`${courses} Courses`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorCard;