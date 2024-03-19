import CommonButton from '@/components/common/CommonButton';
import CommonInput from '@/components/common/CommonInput';
import CourseRating from '@/components/common/features/CourseRating';
import CourseBasic from '@/redux/interfaces/courses/courseBasic.interface';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React from 'react'

interface CourseListProps {
    courses: CourseBasic[];
    isLoading?: boolean;
    search: string;
    onSearchChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAddNewCourseHandler?: () => void;
    onImageClickHandler: (event: React.MouseEvent<HTMLImageElement>) => void;
    showAddButton?: boolean;
}

const CourseList: React.FC<CourseListProps> = (props) => {
    const { courses, isLoading = true, search, onSearchChangeHandler, onImageClickHandler, onClickAddNewCourseHandler, showAddButton = false } = props;

    return (
        isLoading
            ? <div className='flex flex-col items-center justify-center'>
                <div className='sm:flex items-center justify-center p-2 w-full gap-4'>
                    <Skeleton variant='rectangular' className='basis-1/3 rounded-lg w-full h-40' />
                    <div className='flex flex-col basis-2/3'>
                        <Skeleton variant='text' className='rounded-lg w-full' />
                        <Skeleton variant='text' className='rounded-lg w-full' />
                        <Skeleton variant='rectangular' className='rounded-lg w-full h-20' />
                        <Skeleton variant='text' className='rounded-lg w-20' />
                    </div>
                </div>
                <div className='sm:flex items-center justify-center p-2 w-full h-60 gap-4'>
                    <Skeleton variant='rectangular' className='basis-1/3 rounded-lg w-full h-40' />
                    <div className='flex flex-col basis-2/3'>
                        <Skeleton variant='text' className='rounded-lg w-full' />
                        <Skeleton variant='text' className='rounded-lg w-full' />
                        <Skeleton variant='rectangular' className='rounded-lg w-full h-20' />
                        <Skeleton variant='text' className='rounded-lg w-20' />
                    </div>
                </div>
            </div>
            : <div className='flex flex-col items-center justify-center gap-8 w-full'>
                <div className='w-full flex items-center justify-between gap-4'>
                    <CommonInput
                        id='search'
                        placeholder='Search'
                        value={search}
                        onChange={onSearchChangeHandler}
                    />
                    {showAddButton && <CommonButton theme='solid' className='py-1' onClick={onClickAddNewCourseHandler}>
                        Add new Course
                    </CommonButton>}
                </div>
                {courses.map((course) => (
                    <div key={course._id} className='w-full bg-slate-50 dark:bg-slate-900 rounded-lg sm:flex items-center gap-4 p-2'>
                        <Image
                            id={course._id}
                            alt={course.name}
                            src={course.thumbnail?.url ?? ''}
                            height={0}
                            width={0}
                            className='w-full sm:w-60 max-h-40 sm:max-h-80 pb-2 sm:pb-0 cursor-pointer'
                            onClick={onImageClickHandler}
                        />
                        <div className='flex flex-col'>
                            <p className='text-lg font-bold'>{course.name}</p>
                            <CourseRating rating={Number(course.rating?.toFixed(1) ?? 4.5)} reviews={course.reviews.length} />
                            <p className='text-base line-clamp-2'>{course.description}</p>
                            <p className='text-base text-slate-500'>{course.level}</p>
                            <p className='text-sm line-clamp-1'>{course.tags}</p>
                            <div className='flex items-center gap-2 pt-4'>
                                <p className='text-xl font-bold'>€{course.price}</p>
                                {course.estimatedPrice && <>
                                    <p className='text-sm line-through'>€{course.estimatedPrice}</p>
                                    <p>{Math.round(((course.estimatedPrice - course.price) / course.estimatedPrice) * 100)}% OFF</p>
                                </>}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
    )
}

export default CourseList;