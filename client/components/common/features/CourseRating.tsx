import React from 'react'
import StarComponent from './StarComponent';

interface CourseRatingProps {
    rating: number;
    reviews: number;
}

const CourseRating: React.FC<CourseRatingProps> = (props) => {
    const { rating, reviews } = props;
    return (
        <div className="flex items-center">
            <StarComponent />
            <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{rating.toFixed(1)}</p>
            <span className="w-1 h-1 mx-1.5 bg-slate-500 rounded-full dark:bg-slate-400"></span>
            <p className="text-sm font-medium slate-gray-900 underline hover:no-underline dark:text-slate-50">{reviews} reviews</p>
        </div>
    )
}

export default CourseRating;