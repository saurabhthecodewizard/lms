import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CreateCourse from '@/redux/interfaces/courses/createCourse.interface';
import toast from 'react-hot-toast';
import { useCreateCourseMutation, useFetchAllCoursesQuery } from '@/redux/features/courses/course.api';
import CourseForm from '../../_components/CourseForm';
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

const CreateCourse = () => {
    const [createCourseMutation, createCourseMutationResult] = useCreateCourseMutation();
    const { refetch } = useFetchAllCoursesQuery();
    const router = useRouter();
    const { values, errors, touched, handleChange, setFieldValue, handleSubmit } = useFormik<CreateCourse>({
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
        onSubmit: async () => {},
    });

    const onSubmitHandler = React.useCallback(() => {
        console.log(values);
        createCourseMutation(values);
    }, [createCourseMutation, values]);

    React.useEffect(() => {
        if (!createCourseMutationResult.isLoading && createCourseMutationResult.isSuccess) {
            toast.success('Course created successfully!');
            refetch();
            router.push('/admin/courses');
        }
        if (!createCourseMutationResult.isLoading && createCourseMutationResult.isError) {
            toast.success('Something went wrong!');
        }
    }, [createCourseMutationResult.isError, createCourseMutationResult.isLoading, createCourseMutationResult.isSuccess, refetch, router])

    return (
        <CourseForm
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={createCourseMutationResult.isLoading}
            isValid={true}
            onSubmitHandler={onSubmitHandler}
            setFieldValue={setFieldValue}
        />
    )
}

export default CreateCourse;