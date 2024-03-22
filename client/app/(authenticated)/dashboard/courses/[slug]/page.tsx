'use client'
import React from "react";
import CoursePreview, { PreviewCourse } from "@/components/CoursePreview";
import { useFetchCourseQuery, useFetchEnrolledCourseDataQuery } from "@/redux/features/courses/course.api";
import CreateCourse from "@/redux/interfaces/courses/createCourse.interface";
import { CircularProgress } from "@mui/material";
import GenericTab, { TabProps } from "@/components/common/GenericTab";
import CourseContent from "../_components/CourseContent";
import CourseReview from "../_components/CourseReview";


export default function Page({ params }: { params: { slug: string } }) {
    const { data, isLoading, isSuccess } = useFetchCourseQuery(params.slug);
    const { data: enrolledData, isLoading: isEnrolledLoading, isSuccess: isEnrolledSuccess, isError: isEnrolledError, refetch: refetchEnrolledCourse } = useFetchEnrolledCourseDataQuery(params.slug);
    const [course, setCourse] = React.useState<PreviewCourse | null>(null);

    const isEnrolled = React.useMemo(() => {
        return isEnrolledSuccess && !isEnrolledLoading && !isEnrolledError;
    }, [isEnrolledError, isEnrolledLoading, isEnrolledSuccess]);

    const tabItems: TabProps[] = React.useMemo((): TabProps[] => {
        const items: TabProps[] = [];
        if (!!course) {
            items.push({
                label: 'Course Info',
                node: <CoursePreview course={course} enrolled={isEnrolled} />
            })
        }

        if (!!enrolledData?.content && !!course) {
            items.push({
                label: 'Course Content',
                node: <CourseContent
                    id={params.slug}
                    title={course.name}
                    description={course.description}
                    videoUrl={course.demoUrl}
                    content={enrolledData.content}
                />
            })
        }

        return [
            ...items,
            {
                label: 'Reviews',
                node: <CourseReview
                    courseId={params.slug}
                    reviews={course?.reviews ?? []}
                />
            }
        ];
    }, [course, enrolledData?.content, isEnrolled, params.slug]);

    React.useEffect(() => {
        if (isSuccess && !isLoading && !!data) {
            setCourse({
                ...data.course,
                thumbnail: data.course.thumbnail?.url
            });
        }
    }, [data, isLoading, isSuccess]);

    return (
        <div className="xl:px-60">
            {isLoading || isEnrolledLoading || !course
                ? <div className="flex w-full items-center justify-center">
                    <CircularProgress />
                </div>
                : !isEnrolled
                    ? <CoursePreview course={course} enrolled={isEnrolled} />
                    : <div className='flex items-center justify-center'>
                        <GenericTab items={tabItems} />
                    </div>}
        </div>
    )
}