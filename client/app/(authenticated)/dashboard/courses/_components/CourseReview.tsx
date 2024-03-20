import CommonButton from '@/components/common/CommonButton';
import CommonTextArea from '@/components/common/CommonTextArea';
import { useAddReviewMutation, useFetchCourseQuery } from '@/redux/features/courses/course.api';
import React from 'react'
import toast from 'react-hot-toast';
import { LuUserCircle } from 'react-icons/lu';
import CourseReviewComment from './CourseReviewComment';
import Comment from '@/redux/interfaces/courses/comment.interface';
import AcadiaModal from '@/components/common/AcadiaModal';
import AcadiaHoverRating from '@/components/common/AcadiaHoverRating';
import Review from '@/redux/interfaces/courses/review.interface';

interface CourseReviewProps {
    courseId: string;
    reviews: Review[];
}

const CourseReview: React.FC<CourseReviewProps> = (props) => {
    const { courseId, reviews = [] } = props;
    const [review, setReview] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const [rating, setRating] = React.useState<number | null>(4.5);
    const [addReview, addReviewResult] = useAddReviewMutation();
    const { refetch: refetchCourse } = useFetchCourseQuery(courseId);

    const onModalCloseHandler = React.useCallback(() => {
        setModalOpen(false);
    }, []);

    const onModalOpenHandler = React.useCallback(() => {
        setModalOpen(true);
    }, []);

    const onCommentChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.currentTarget.value);
    }, []);

    const submitAddCommentHandler = React.useCallback(() => {
        setReview('');
        addReview({
            courseId,
            review: {
                comment: review,
                rating: rating ?? 4.5
            }
        })
    }, [addReview, courseId, review, rating]);

    React.useEffect(() => {
        if (addReviewResult.isSuccess && !addReviewResult.isLoading) {
            toast.success('Review added successfully');
            refetchCourse();
            setReview('');
            onModalCloseHandler();
        }
    }, [addReviewResult.isLoading, addReviewResult.isSuccess, onModalCloseHandler, refetchCourse]);

    return (
        <div className='flex flex-col w-full gap-8'>
            <CommonButton onClick={onModalOpenHandler} theme='solid' className='w-fit self-center'>Add Your Review</CommonButton>
            <AcadiaModal
                open={modalOpen}
                onModalClose={onModalCloseHandler}
                headerText='Add your review'
                onPrimaryAction={submitAddCommentHandler}
                onCancel={onModalCloseHandler}
            >
                <div className='w-full flex flex-col items-center justify-center'>
                    <AcadiaHoverRating value={rating} setValue={setRating} />
                    <CommonTextArea
                        id='comment'
                        placeholder='What did you like the most about the course?'
                        value={review}
                        onChange={onCommentChangeHandler}
                    />
                </div>
            </AcadiaModal>
            <div className='flex flex-col gap-2'>
                {reviews.map((comment) => (
                    <CourseReviewComment
                        key={comment._id}
                        courseId={courseId}
                        rating={comment.rating}
                        comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default CourseReview;