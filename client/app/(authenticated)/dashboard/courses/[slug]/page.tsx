'use client'
import React from "react";
import CoursePreview from "@/components/CoursePreview";
import { useFetchCourseQuery } from "@/redux/features/courses/course.api";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";
import { CircularProgress } from "@mui/material";


export default function Page({ params }: { params: { slug: string } }) {
    const { data, isLoading, isSuccess } = useFetchCourseQuery(params.slug);
    const [course, setCourse] = React.useState<CreateCourse & { rating?: number } | null>(null);
    React.useEffect(() => {
        if (isSuccess && !isLoading && !!data) {
            setCourse({
                ...data.course,
                thumbnail: data.course.thumbnail?.url
            });
        }
    }, [data, isLoading, isSuccess]);
    return isLoading || !course
        ? <CircularProgress />
        : <CoursePreview course={course} />
}