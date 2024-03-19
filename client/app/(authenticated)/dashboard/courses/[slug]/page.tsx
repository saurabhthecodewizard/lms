'use client'
import React from "react";
import CoursePreview from "@/components/CoursePreview";
import { useFetchCourseQuery, useFetchEnrolledCourseDataQuery } from "@/redux/features/courses/course.api";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";
import { CircularProgress } from "@mui/material";


export default function Page({ params }: { params: { slug: string } }) {
    const { data, isLoading, isSuccess } = useFetchCourseQuery(params.slug);
    const { data: enrolledData, isLoading: isEnrolledLoading, isSuccess: isEnrolledSuccess, isError: isEnrolledError } =useFetchEnrolledCourseDataQuery(params.slug);
    const [course, setCourse] = React.useState<CreateCourse & { rating?: number } | null>(null);
    React.useEffect(() => {
        if (isSuccess && !isLoading && !!data) {
            setCourse({
                ...data.course,
                thumbnail: data.course.thumbnail?.url
            });
        }
    }, [data, isLoading, isSuccess]);
    return isLoading || isEnrolledLoading || !course
        ? <div className="flex w-full items-center justify-center">
            <CircularProgress />
        </div>
        : <CoursePreview course={course} enrolled={isEnrolledSuccess && !isEnrolledLoading && !isEnrolledError} />
}