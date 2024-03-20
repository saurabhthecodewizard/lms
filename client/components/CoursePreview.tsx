import CreateCourse from '@/redux/interfaces/courses/createCourse.interface';
import Image from 'next/image';
import React from 'react';
import AcadiaVideoFrame from './common/AcadiaVideoFrame';
import CommonButton from './common/CommonButton';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import CourseRating from './common/features/CourseRating';
import Review from '@/redux/interfaces/courses/review.interface';
import CourseReview from '@/app/(authenticated)/dashboard/courses/_components/CourseReview';

interface PreviewCourseData {
    title: string;
    description: string;
    videoUrl: string;
    videoLength: number;
}

export interface PreviewCourse {
    _id?: string;
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    thumbnail?: string;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: {
        title: string;
    }[];
    prerequisites: {
        title: string;
    }[];
    courseData: PreviewCourseData[];
    rating?: number;
    reviews?: Review[];
}

interface CoursePreviewProps {
    course: PreviewCourse;
    enrolled?: boolean;
    isAdminPreview?: boolean;
}

const Heading: React.FC<{ children: string }> = (props) => {
    return <p className='text-xl font-bold'>{props.children}</p>
}

const CheckDoneText: React.FC<{ children: string }> = (props) => {
    return <div className='flex items-center gap-2'>
        <IoCheckmarkDone />
        <p className='text-sm'>{props.children}</p>
    </div>
}

const CoursePreview: React.FC<CoursePreviewProps> = (props) => {
    const { course, enrolled = false, isAdminPreview = false } = props;
    const [visibleCourseSection, setVisibleCourseSection] = React.useState(-1);

    return (
        <div className='flex flex-col items-center justify-center gap-4 pb-4'>
            <Image
                alt={course.name}
                src={course.thumbnail ?? ''}
                height={0}
                width={0}
                className='object-fill w-full max-h-96'
            />
            <div className='flex flex-col sm:flex-row-reverse justify-between w-full gap-2 px-4'>
                <div className='flex flex-col gap-3 basis-1/2'>
                    <AcadiaVideoFrame videoId={course.demoUrl} />
                    {!enrolled
                        ? <div className='flex sm:flex-col gap-2 justify-between sm:justify-start'>
                            <div className='flex items-center gap-2'>
                                <p className='text-xl font-bold'>€{course.price}</p>
                                {course.estimatedPrice && <>
                                    <p className='text-sm line-through'>€{course.estimatedPrice}</p>
                                    <p>{Math.round(((course.estimatedPrice - course.price) / course.estimatedPrice) * 100)}% OFF</p>
                                </>}
                            </div>
                            <CommonButton theme='solid' className='w-fit' rounded='full'>
                                BUY NOW
                            </CommonButton>
                        </div>
                        : <div className='flex items-center justify-center'>
                            <p className='text-sm italic text-orange-500'>You have purchased this course</p>
                        </div>}

                </div>
                <div className='flex flex-col gap-8 basis-1/2'>
                    <div className='flex flex-col gap-2'>
                        <Heading>{course.name}</Heading>
                        <CourseRating rating={course.rating ?? 4.5} reviews={46} />
                        <p className='text-sm'>{course.description}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <Heading>What will you learn from this course?</Heading>
                        {course.benefits.map((benefit, index) => (
                            <CheckDoneText key={index}>{benefit.title}</CheckDoneText>
                        ))}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <Heading>What are the prerequisites required?</Heading>
                        {course.prerequisites.map((prerequisite, index) => (
                            <CheckDoneText key={index}>{prerequisite.title}</CheckDoneText>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                {!enrolled && <div className='flex flex-col'>
                    <Heading>Course Overview</Heading>
                    <div className='flex flex-col gap-2 mt-2'>
                        {course.courseData.map((content, index) => (
                            <div key={content.title} className='flex flex-col bg-slate-200 dark:bg-slate-800 rounded-lg p-2 gap-2'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-base'>{content.title}</p>
                                    {index === visibleCourseSection
                                        ? <MdKeyboardArrowUp onClick={() => setVisibleCourseSection(-1)} size={30} className='cursor-pointer' />
                                        : <MdKeyboardArrowDown onClick={() => setVisibleCourseSection(index)} size={30} className='cursor-pointer' />
                                    }
                                </div>
                                {index === visibleCourseSection && <>
                                    <p className='text-sm text-slate-500'>{content.videoLength} min</p>
                                    {isAdminPreview && <AcadiaVideoFrame videoId={content.videoUrl} />}
                                    <p className='text-sm'>{content.description}</p>
                                </>}
                            </div>
                        ))}
                    </div>
                </div>}

                {!enrolled && course._id && !!course.reviews && 
                <div className='flex flex-col items-center justify-center gap-4'>
                    <Heading>Reviews</Heading>
                    <CourseReview courseId={course._id} reviews={course.reviews} showAddReview={false} />
                </div>}
            </div>
        </div>
    )
}

export default CoursePreview;