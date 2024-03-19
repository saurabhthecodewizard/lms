import { useFetchAllEnrolledCoursesQuery, useFetchAvailableCoursesQuery } from '@/redux/features/courses/course.api';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import CourseList from './CourseList';
import { FormControlLabel, Switch } from '@mui/material';

const Dashboard = () => {
  const { data, isLoading, isFetching, isError } = useFetchAvailableCoursesQuery();
  const { data: allEnrolledCourses, isLoading: isAllEnrolledCoursesLoading } = useFetchAllEnrolledCoursesQuery();
  const [search, setSearch] = React.useState<string>('');
  const [showEnrolledOnly, setShowEnrolledOnly] = React.useState<boolean>(false);
  const router = useRouter();

  const onSearchChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const onChangeEnrolledToggleHandler = React.useCallback((_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setShowEnrolledOnly(checked);
  }, [])

  const filteredEnrolledCourses = React.useMemo(() => {
    if (!data || !allEnrolledCourses) {
      return []
    }
    return data.courses
      .filter((course) => !allEnrolledCourses.content.includes(course._id))
      .filter((course) => course.name.toLowerCase().includes(search.toLowerCase()));
  }, [allEnrolledCourses, data, search])

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

    router.push(`/dashboard/courses/${id}`);
  }, [router]);

  React.useEffect(() => {
    if (isError) {
      toast.error('Something went wrong!');
    }
  }, [isError]);

  return (
    <>
      <div className='w-full flex items-center justify-end'>
        <FormControlLabel control={<Switch checked={showEnrolledOnly} onChange={onChangeEnrolledToggleHandler} />} label="Show EnrolledOnly" sx={{ placeSelf: 'flex-end' }} />
      </div>

      <CourseList
        courses={showEnrolledOnly ? filteredEnrolledCourses : courses}
        isLoading={isLoading || isFetching}
        onImageClickHandler={onImageClickHandler}
        search={search}
        onSearchChangeHandler={onSearchChangeHandler}
      />
    </>
  )
}

export default Dashboard;