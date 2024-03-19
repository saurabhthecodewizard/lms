import CourseList from '@/app/(authenticated)/dashboard/_components/CourseList';
import { useFetchAllCoursesQuery } from '@/redux/features/courses/course.api';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const AllCourses = () => {
  const { data, isLoading, isFetching, isError } = useFetchAllCoursesQuery();
  const [search, setSearch] = React.useState<string>('');
  const router = useRouter();

  const onSearchChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const courses = React.useMemo(() => {
    if (!data) {
      return []
    }
    return data.courses.filter((course) => course.name.toLowerCase().includes(search.toLowerCase()));
  }, [data, search])

  const onImageClickHandler = React.useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    if (!id) {
      toast.error("Invalid course");
    }

    router.push(`/admin/courses/${id}`);
  }, [router]);

  React.useEffect(() => {
    if (isError) {
      toast.error('Something went wrong!');
    }
  }, [isError]);

  const onClickAddNewCourseHandler = React.useCallback(() => {
    router.push('/admin/courses/new');
  }, [router]);

  return (
    <CourseList
      courses={courses}
      isLoading={isLoading || isFetching}
      onImageClickHandler={onImageClickHandler}
      search={search}
      onSearchChangeHandler={onSearchChangeHandler}
      onClickAddNewCourseHandler={onClickAddNewCourseHandler}
      showAddButton
    />
  )
}

export default AllCourses;