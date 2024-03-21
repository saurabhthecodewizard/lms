import AcadiaHoverRating from '@/components/common/AcadiaHoverRating';
import CommonButton from '@/components/common/CommonButton';
import CommonInput from '@/components/common/CommonInput';
import useNotify from '@/hooks/useNotify';
import useProfile from '@/hooks/useProfile';
import { useAddReviewReplyMutation, useFetchCourseQuery } from '@/redux/features/courses/course.api';
import Comment from '@/redux/interfaces/courses/comment.interface';
import React from 'react'
import toast from 'react-hot-toast';
import { FaPencilAlt } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { LuUserCircle } from 'react-icons/lu';

interface CourseReviewCommentProps {
    courseId: string;
    rating: number;
    comment: Comment;
    level?: number;
}

const CourseReviewComment: React.FC<CourseReviewCommentProps> = (props) => {
    const { courseId, comment, level = 0, rating } = props;
    const [isReplyToggle, setIsReplyToggle] = React.useState(false);
    const [reply, setReply] = React.useState('');
    const [addReviewReply, addReviewReplyResult] = useAddReviewReplyMutation();
    const { refetch: refetchCourse } = useFetchCourseQuery(courseId);
    const { isAdmin } = useProfile();
    const notify = useNotify();

    const onIsReplyToggleHandler = React.useCallback(() => {
        setReply('');
        setIsReplyToggle(!isReplyToggle);
    }, [isReplyToggle]);

    const onReplyChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setReply(event.currentTarget.value);
    }, []);

    const onReplySubmitHandler = React.useCallback(() => {
        if (reply.length === 0) {
            toast.error('Reply cannot be empty!');
            return;
        }
        addReviewReply({
            courseId: courseId,
            reviewId: comment._id,
            reviewReply: {
                comment: reply
            }
        })
    }, [addReviewReply, comment._id, courseId, reply]);

    const renderReplies = React.useCallback((replies: Comment[]) => {
        return (
            <ul className="ml-4">
                {replies.map((reply, index) => (
                    <li key={reply._id} className="">
                        <div className="flex items-start">
                            <div className={`${index === replies.length - 1 ? 'hidden' : 'block'}`} />
                            <CourseReviewComment
                                courseId={courseId}
                                comment={reply}
                                rating={rating}
                                level={level + 1} />
                        </div>
                    </li>
                ))}
            </ul>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, level, comment?.replies?.length]);

    React.useEffect(() => {
        if (addReviewReplyResult.isSuccess && !addReviewReplyResult.isLoading) {
            toast.success('Reply successful');
            setIsReplyToggle(false);
            setReply('');
            refetchCourse();
            notify();
        }
    }, [addReviewReplyResult.isLoading, addReviewReplyResult.isSuccess, notify, refetchCourse]);

    return (
        <div className="px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-lg">
            <div className="flex w-full">
                {!level
                    ? <LuUserCircle size={25} className='' />
                    : <GrUserAdmin size={25} />}
                <div className="ml-2 w-full">
                    <h3 className="font-semibold">{comment.user.firstName} {comment.user.lastName}</h3>
                    {!level && <AcadiaHoverRating value={rating} readOnly />}
                    {comment.comment && !!comment.comment.length &&
                        <p className="text-slate-600 dark:text-slate-400">{comment.comment}</p>}
                    {!level && isAdmin && <>
                        {isReplyToggle
                            ? <div className="flex flex-col gap-2 w-full mt-2">
                                <CommonInput
                                    id={`comment-${level}`}
                                    placeholder="What do you think?"
                                    value={reply}
                                    onChange={onReplyChangeHandler}
                                />
                                <div className="flex gap-2 items-center">
                                    <CommonButton onClick={onReplySubmitHandler} theme="solid" className="py-0 px-1">
                                        Reply
                                    </CommonButton>
                                    <CommonButton onClick={onIsReplyToggleHandler} theme="outline" className="py-0 px-1">
                                        Cancel
                                    </CommonButton>
                                </div>
                            </div>
                            : <button onClick={onIsReplyToggleHandler} className="flex gap-1 mt-2 items-center cursor-pointer">
                                <FaPencilAlt className="text-orange-500" />
                                <p className="text-sm text-orange-500">Add Reply</p>
                            </button>}
                    </>}
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && renderReplies(comment.replies)}
        </div>
    );
}

export default CourseReviewComment;