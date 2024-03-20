import AcadiaVideoFrame from '@/components/common/AcadiaVideoFrame';
import GenericTab, { TabProps } from '@/components/common/GenericTab';
import EnrolledCourseData from '@/redux/interfaces/courses/enrolledCourseData.interface';
import React from 'react'
import { LuMonitorPlay } from 'react-icons/lu';
import LectureHeading from './LectureHeading';
import LectureOverview from './LectureOverview';
import CourseDiscussions from './CourseDiscussions';
import Comment from '@/redux/interfaces/courses/comment.interface';
import CourseReview from './CourseReview';

interface CourseContentProps {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    content: EnrolledCourseData[];
}

const CourseContent: React.FC<CourseContentProps> = (props) => {
    const { id, title, description, videoUrl, content } = props;
    const [selectedContent, setSelectedContent] = React.useState<EnrolledCourseData | null>(null);

    const onLectureClickHandler = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const id = event.currentTarget.id;
        if (!id || id === 'preview') {
            setSelectedContent(null);
        } else {
            setSelectedContent(content[Number(id)]);
        }
    }, [content]);

    const tabItems: TabProps[] = React.useMemo(() => {
        const items: TabProps[] = [
            {
                label: "Content",
                node: <LectureHeading title={title} content={content} onLectureClickHandler={onLectureClickHandler} />
            },
            {
                label: 'Overview',
                node: <LectureOverview
                    title={!!selectedContent ? selectedContent.title : title}
                    description={!!selectedContent ? selectedContent.description : description}
                    length={!!selectedContent ? selectedContent.videoLength : undefined}
                />
            },
            {
                label: 'Reviews',
                node: <CourseReview />
            }
        ];

        if (!!selectedContent) {
            items.push({
                label: 'Discussions',
                node: <CourseDiscussions
                    courseId={id}
                    contentId={selectedContent._id}
                    comments={selectedContent.comments}
                />
            })
        }

        return items;
    }, [content, description, id, onLectureClickHandler, selectedContent, title]);

    return (
        <div className='flex flex-col gap-4 w-full'>
            <div className=''>
                <AcadiaVideoFrame videoId={!!selectedContent ? selectedContent.videoUrl : videoUrl} />
            </div>
            <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 w-full" />
            <span className='-mt-8'></span>
            <GenericTab items={tabItems} />
        </div>
    )
}

export default CourseContent;