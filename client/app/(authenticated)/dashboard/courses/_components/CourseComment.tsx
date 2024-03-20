import CommonButton from "@/components/common/CommonButton";
import CommonInput from "@/components/common/CommonInput";
import { useAddCommentReplyMutation, useFetchEnrolledCourseDataQuery } from "@/redux/features/courses/course.api";
import Comment from "@/redux/interfaces/courses/comment.interface";
import React from "react";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { LuUserCircle } from "react-icons/lu";

interface CourseCommentProps {
    courseId: string;
    contentId: string;
    comment: Comment;
    level?: number;
}

const CourseComment: React.FC<CourseCommentProps> = ({ courseId, contentId, comment, level = 0 }) => {
    const [isReplyToggle, setIsReplyToggle] = React.useState(false);
    const [reply, setReply] = React.useState('');
    const [addCommentReply, addCommentReplyResult] = useAddCommentReplyMutation();
    const { refetch: refetchEnrolledCourse, isSuccess } = useFetchEnrolledCourseDataQuery(courseId);

    const onIsReplyToggleHandler = React.useCallback(() => {
        setReply('');
        setIsReplyToggle(!isReplyToggle);
    }, [isReplyToggle]);

    const onReplyChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setReply(event.currentTarget.value);
    }, []);

    const onReplySubmitHandler = React.useCallback(() => {
        addCommentReply({
            courseId: courseId,
            reply: {
                contentId: contentId,
                commentId: comment._id,
                reply: reply
            }
        })
    }, [addCommentReply, comment._id, contentId, courseId, reply]);

    const renderReplies = React.useCallback((replies: Comment[]) => {
        return (
            <ul className="ml-4">
                {replies.map((reply, index) => (
                    <li key={reply._id} className="">
                        <div className="flex items-start">
                            <div className={`${index === replies.length - 1 ? 'hidden' : 'block'}`} />
                            <CourseComment
                                courseId={courseId}
                                contentId={contentId}
                                comment={reply}
                                level={level + 1} />
                        </div>
                    </li>
                ))}
            </ul>
        );
    }, [contentId, courseId, level]);

    React.useEffect(() => {
        if (isSuccess) {
            setIsReplyToggle(false);
            setReply('');
        }
    }, [isSuccess]);

    React.useEffect(() => {
        if (addCommentReplyResult.isSuccess && !addCommentReplyResult.isLoading) {
            toast.success('Reply successful');
            setIsReplyToggle(false);
            setReply('');
            refetchEnrolledCourse();
        }
    }, [addCommentReplyResult.isLoading, addCommentReplyResult.isSuccess, refetchEnrolledCourse]);

    return (
        <div className="px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-lg">
            <div className="flex w-full">
                <LuUserCircle size={25} className='' />
                <div className="ml-2 w-full">
                    <h3 className="font-semibold">{comment.user.firstName} {comment.user.lastName}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{comment.comment}</p>
                    {!level && <>
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
};

export default CourseComment;