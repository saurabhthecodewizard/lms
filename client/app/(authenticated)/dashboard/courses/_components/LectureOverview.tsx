import React from 'react'
import { LuMonitorPlay } from 'react-icons/lu';

interface LectureOverviewProps {
    title: string;
    description: string;
    length?: number;
}

const LectureOverview: React.FC<LectureOverviewProps> = (props) => {
    const { title, description, length } = props;
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-lg font-bold'>{title}</p>
            <div className='flex gap-2 items-center'>
                <LuMonitorPlay />
                {length
                    ? <p className=''>{`${length} min`}</p>
                    : <p>Preview</p>}
            </div>
            <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 w-full" />
            <p className='text-base'>{description}</p>
        </div>
    )
}

export default LectureOverview;