import CommonButton from '@/components/common/CommonButton';
import CommonTextArea from '@/components/common/CommonTextArea';
import { useAddCommentMutation, useFetchEnrolledCourseDataQuery } from '@/redux/features/courses/course.api';
import Comment from '@/redux/interfaces/courses/comment.interface';
import React from 'react'
import { LuUserCircle } from 'react-icons/lu';
import CourseComment from './CourseComment';
import toast from 'react-hot-toast';

interface CourseDiscussionsProps {
    courseId: string;
    contentId: string;
    comments: Comment[];
}

const CourseDiscussions: React.FC<CourseDiscussionsProps> = (props) => {
    const { courseId, contentId, comments = [] } = props;
    const [comment, setComment] = React.useState('');
    const [addComment, addCommentResult] = useAddCommentMutation();
    const { refetch: refetchEnrolledCourse } = useFetchEnrolledCourseDataQuery(courseId);

    const onCommentChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.currentTarget.value);
    }, []);

    const submitAddCommentHandler = React.useCallback(() => {
        if (comment.length === 0) {
            toast.error('Comment is empty!');
            return;
        }
        setComment('');
        addComment({ courseId, comment: { contentId: contentId, comment } })
    }, [addComment, comment, contentId, courseId]);

    React.useEffect(() => {
        if (addCommentResult.isSuccess && !addCommentResult.isLoading) {
            toast.success('Comment added successfully');
            refetchEnrolledCourse();
            setComment('');
        }
    }, [addCommentResult.isLoading, addCommentResult.isSuccess, refetchEnrolledCourse]);

    return (
        <div className='flex flex-col w-full gap-8'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 w-full'>
                    <LuUserCircle size={40} />
                    <div className='w-full'>
                        <CommonTextArea
                            id='comment'
                            placeholder='What is your doubt?'
                            value={comment}
                            onChange={onCommentChangeHandler}
                        />
                    </div>
                </div>
                <CommonButton theme='solid' onClick={submitAddCommentHandler} className='w-fit ml-12'>
                    Add Comment
                </CommonButton>
            </div>
            <div className='flex flex-col gap-2'>
                {comments.map((comment) => (
                    <CourseComment
                        key={comment._id}
                        courseId={courseId}
                        contentId={contentId}
                        comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default CourseDiscussions;