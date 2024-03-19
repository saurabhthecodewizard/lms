import EnrolledCourseData from '@/redux/interfaces/courses/enrolledCourseData.interface';
import React from 'react'
import { LuMonitorPlay } from 'react-icons/lu';

interface LectureHeadingProps {
    title: string;
    content: EnrolledCourseData[];
    onLectureClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LectureHeading: React.FC<LectureHeadingProps> = (props) => {
    const { title, content, onLectureClickHandler } = props;
    return (
        <div className='w-full flex flex-col gap-2'>
            <button id='preview' onClick={onLectureClickHandler} className='w-full flex flex-col p-2 gap-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg cursor-pointer'>
                <div className='flex gap-2 items-center'>
                    <p className=''>0.</p>
                    <p className=''>{title}</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <LuMonitorPlay />
                    <p className=''>Preview</p>
                </div>
            </button>
            {content.map((lecture, index) => (
                <button key={index} id={String(index)} onClick={onLectureClickHandler} className='w-full flex flex-col p-2 gap-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg cursor-pointer'>
                    <div className='flex gap-2 items-center'>
                        <p className=''>{`${index+1}.`}</p>
                        <p className=''>{lecture.title}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <LuMonitorPlay />
                        <p className=''>{`${lecture.videoLength} min`}</p>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default LectureHeading;