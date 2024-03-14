import CommonInput from '@/components/common/CommonInput';
import CourseRating from '@/components/common/features/CourseRating';
import { useFetchAllCoursesQuery } from '@/redux/features/courses/course.api';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import toast from 'react-hot-toast';

const AllCourses = () => {
  const { data, isLoading, isFetching, isError } = useFetchAllCoursesQuery();
  const [search, setSearch] = React.useState<string>('');

  const onSearchChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const courses = React.useMemo(() => {
    if (!data) {
      return []
    }
    return data.courses.filter((course) => course.name.toLowerCase().includes(search.toLowerCase()));
  }, [data, search])

  React.useEffect(() => {
    if (isError) {
      toast.error('Something went wrong!');
    }
  }, [isError]);

  return (
    isLoading || isFetching
      ? <div className='flex flex-col items-center justify-center'>
        <div className='sm:flex items-center justify-center p-2 w-full gap-4'>
          <Skeleton variant='rectangular' className='basis-1/3 rounded-lg w-full h-40' />
          <div className='flex flex-col basis-2/3'>
            <Skeleton variant='text' className='rounded-lg w-full' />
            <Skeleton variant='text' className='rounded-lg w-full' />
            <Skeleton variant='rectangular' className='rounded-lg w-full h-20' />
            <Skeleton variant='text' className='rounded-lg w-20' />
          </div>
        </div>
        <div className='sm:flex items-center justify-center p-2 w-full h-60 gap-4'>
          <Skeleton variant='rectangular' className='basis-1/3 rounded-lg w-full h-40' />
          <div className='flex flex-col basis-2/3'>
            <Skeleton variant='text' className='rounded-lg w-full' />
            <Skeleton variant='text' className='rounded-lg w-full' />
            <Skeleton variant='rectangular' className='rounded-lg w-full h-20' />
            <Skeleton variant='text' className='rounded-lg w-20' />
          </div>
        </div>
      </div>
      : <div className='flex flex-col items-center justify-center gap-8'>
        <CommonInput
        id='search'
        placeholder='Search'
        value={search}
        onChange={onSearchChangeHandler}
        />
        {courses.map((course) => (
          <div key={course._id} className='bg-slate-50 dark:bg-slate-900 rounded-lg sm:flex items-center gap-4 p-2'>
            <Image
              alt={course.name}
              src={course.thumbnail?.url ?? ''}
              height={0}
              width={0}
              className='w-full sm:w-60 max-h-40 sm:max-h-80 pb-2 sm:pb-0'
            />
            <div className='flex flex-col'>
              <p className='text-lg font-bold'>{course.name}</p>
              <CourseRating rating={Number(course.rating?.toFixed(1) ?? 4.5)} reviews={course.reviews.length} />
              <p className='text-base line-clamp-2'>{course.description}</p>
              <p className='text-base text-slate-500'>{course.level}</p>
              <p className='text-sm line-clamp-1'>{course.tags}</p>
              <div className='flex items-center gap-2 pt-4'>
                <p className='text-xl font-bold'>€{course.price}</p>
                {course.estimatedPrice && <>
                  <p className='text-sm line-through'>€{course.estimatedPrice}</p>
                  <p>{Math.round(((course.estimatedPrice - course.price) / course.estimatedPrice) * 100)}% OFF</p>
                </>}
              </div>
            </div>

          </div>
        ))}
      </div>
  )
}

export default AllCourses;