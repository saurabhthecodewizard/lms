import Comment from '@/redux/interfaces/courses/comment.interface';
import UserBasic from '@/redux/interfaces/users/userBasic.interface';
import React from 'react'
import { LuUserCircle } from 'react-icons/lu';

const user1: UserBasic = {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: {
        public_id: '',
        url: ''
    },
    role: "user"
};

const user2: UserBasic = {
    _id: "2",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    avatar: {
        public_id: '',
        url: ''
    },
    role: "user"
};

const user3: UserBasic = {
    _id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    avatar: {
        public_id: '',
        url: ''
    },
    role: "user"
};

const comments: Comment[] = [
    {
        user: user1,
        comment: "This is the first first level comment.",
        replies: [
            {
                user: user2,
                comment: "Reply to the first first level comment.",
                replies: [
                    {
                        user: user3,
                        comment: "Reply to the first second level comment."
                    }
                ]
            },
            {
                user: user3,
                comment: "Another reply to the first first level comment."
            }
        ]
    },
    {
        user: user1,
        comment: "This is the second first level comment.",
        replies: [
            {
                user: user2,
                comment: "Reply to the second first level comment.",
                replies: [
                    {
                        user: user3,
                        comment: "Reply to the second second level comment."
                    }
                ]
            },
            {
                user: user3,
                comment: "Another reply to the second first level comment."
            }
        ]
    }
]

interface CommentProps {
    comment: Comment;
    level?: number;
}

const Comment: React.FC<CommentProps> = ({ comment, level = 0 }) => {
    const renderReplies = (replies: Comment[]) => {
        return (
            <ul className="ml-4">
                {replies.map((reply, index) => (
                    <li key={index} className="">
                        <div className="flex items-start">
                            <div className={`w-2 h-full ${index === replies.length - 1 ? 'hidden' : 'block'}`} />
                            <Comment comment={reply} level={level + 1} />
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="p-4 rounded-lg">
            <div className="flex items-center">
                <LuUserCircle size={25} />
                <div className="ml-2">
                    <h3 className="font-semibold">{comment.user.firstName} {comment.user.lastName}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{comment.comment}</p>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && renderReplies(comment.replies)}
        </div>
    );
};


const CourseDiscussions = () => {
    return (
        <div className='flex flex-col w-full gap-8'>
            <div className='flex gap-2 w-full'>
                <LuUserCircle size={40} />
                <div className='w-full'>
                    <textarea rows={5} className='w-full border-2 border-orange-500 rounded-lg focus-visible:border-orange-500' />
                </div>
            </div>
            <div className='flex flex-col bg-slate-300 dark:bg-slate-700 rounded-lg'>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default CourseDiscussions;