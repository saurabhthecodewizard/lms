import { useFetchAvailableCoursesQuery } from '@/redux/features/courses/course.api';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import CourseList from './CourseList';

const Dashboard = () => {
  const { data, isLoading, isFetching, isError } = useFetchAvailableCoursesQuery();
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

    router.push(`/courses/${id}`);
  }, [router]);

  React.useEffect(() => {
    if (isError) {
      toast.error('Something went wrong!');
    }
  }, [isError]);

  return (
    <CourseList
      courses={courses}
      isLoading={isLoading || isFetching}
      onImageClickHandler={onImageClickHandler}
      search={search}
      onSearchChangeHandler={onSearchChangeHandler}
    />
  )
}

export default Dashboard;