'use client'
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CreateCourse from '@/redux/interfaces/courses/createCourse.interface';
import { useFetchAllCoursesQuery, useFetchCourseQuery, useUpdateCourseMutation } from '@/redux/features/courses/course.api';
import CourseForm from '../_components/CourseForm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const courseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    estimatedPrice: Yup.number().required('Price is required'),
    thumbnail: Yup.object().required('Thumbnail is required'),
    tags: Yup.string(),
    level: Yup.string().required('Level is required'),
    demoUrl: Yup.string().required('Demo URL is required'),
    benefits: Yup.array().of(Yup.object().shape({
        title: Yup.string().required('Benefit title is required'),
    })).required('At least one benefit is required'),
    prerequisites: Yup.array().of(Yup.object().shape({
        title: Yup.string().required('Prerequisite title is required'),
    })).required('At least one prerequisite is required'),
    courseData: Yup.array().of(Yup.object().shape({
        title: Yup.string().required('Course data title is required'),
        description: Yup.string().required('Course data description is required'),
        videoUrl: Yup.string().required('Video URL is required'),
        videoLength: Yup.number().required('Video length is required')
    })).required('At least one course data is required'),
});

export default function Page({ params }: { params: { slug: string } }) {
    const { data, isLoading, isSuccess } = useFetchCourseQuery(params.slug);
    const [updateCourseMutation, updateCourseMutationResult] = useUpdateCourseMutation();
    const { refetch } = useFetchAllCoursesQuery();
    const router = useRouter();
    const { values, errors, touched, handleChange, setFieldValue, handleSubmit, setValues } = useFormik<CreateCourse>({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            estimatedPrice: 0,
            thumbnail: '',
            tags: '',
            level: '',
            demoUrl: '',
            benefits: [{ title: '' }],
            prerequisites: [{ title: '' }],
            courseData: [{
                title: 'Untitled Content 1',
                description: '',
                videoUrl: '',
                videoLength: 0,
            }],
        },
        validationSchema: courseSchema,
        onSubmit: async () => { },
    });

    const onSubmitHandler = React.useCallback(() => {
        console.log(values);
        updateCourseMutation({ courseId: params.slug, course: values });
    }, [params.slug, updateCourseMutation, values]);

    React.useEffect(() => {
        if (isSuccess && !isLoading && !!data) {
            setValues({
                ...data.course,
                thumbnail: data.course.thumbnail?.url
            });
        }
    }, [data, isLoading, isSuccess, setValues]);

    React.useEffect(() => {
        if (!updateCourseMutationResult.isLoading && updateCourseMutationResult.isSuccess) {
            toast.success('Course updated successfully!');
            refetch();
            router.push('/admin/courses');
        }
        if (!updateCourseMutationResult.isLoading && updateCourseMutationResult.isError) {
            toast.success('Something went wrong!');
        }
    }, [refetch, router, updateCourseMutationResult.isError, updateCourseMutationResult.isLoading, updateCourseMutationResult.isSuccess])

    return (
        <div className='xl:px-60'>
            <CourseForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                isValid={true}
                onSubmitHandler={onSubmitHandler}
                setFieldValue={setFieldValue}
            />
        </div>
    )
}