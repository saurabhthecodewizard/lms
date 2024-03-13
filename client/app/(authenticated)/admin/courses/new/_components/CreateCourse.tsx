import AcadiaStepper, { AcadiaStepperItem } from '@/components/common/AcadiaStepper';
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CreateCourse from '@/redux/interfaces/courses/createCourse.interface';
import CommonInput from '@/components/common/CommonInput';
import CommonFileInput from '@/components/common/CommonFileInput';
import CommonTextArea from '@/components/common/CommonTextArea';
import toast from 'react-hot-toast';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

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
    const { values, errors, touched, handleChange, setFieldValue, handleSubmit, isSubmitting } = useFormik<CreateCourse>({
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
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const [visibleCourseSection, setVisibleCourseSection] = React.useState(0);

    const onSubmitHandler = React.useCallback(() => {
        console.log(values);
    }, [values]);

    const addBenefitHandler = React.useCallback(() => {
        const isValidBenefits = values.benefits.some((benefit) => benefit.title === '');
        if (isValidBenefits) {
            toast.error('Existing benefits empty!');
            return;
        }
        setFieldValue('benefits', [...values.benefits, { title: '' }])
    }, [setFieldValue, values.benefits]);

    const removeBenefitHandler = React.useCallback((requiredIndex: number) => {
        setFieldValue('benefits', values.benefits.filter((_, index) => requiredIndex != index));
    }, [setFieldValue, values.benefits]);

    const addPrerequisiteHandler = React.useCallback(() => {
        const isValidBenefits = values.prerequisites.some((prerequisite) => prerequisite.title === '');
        if (isValidBenefits) {
            toast.error('Existing benefits empty!');
            return;
        }
        setFieldValue('prerequisites', [...values.prerequisites, { title: '' }])
    }, [setFieldValue, values.prerequisites]);

    const removePrerequisiteHandler = React.useCallback((requiredIndex: number) => {
        setFieldValue('prerequisites', values.prerequisites.filter((_, index) => requiredIndex != index));
    }, [setFieldValue, values.prerequisites]);

    const addCourseVideoHandler = React.useCallback(() => {
        const isValidCourseVideo = values.courseData.some((courseContent) => courseContent.title === '' || courseContent.description === '' || courseContent.videoUrl === '' || courseContent.videoLength === 0);
        if (isValidCourseVideo) {
            toast.error('All fields are mandatory!');
            return;
        }
        setFieldValue('courseData', [...values.courseData, { title: `Untitled Content ${values.courseData.length + 1}`, description: '', videoUrl: '', videoLength: 0, }])
    }, [setFieldValue, values.courseData]);

    const removeCourseVideoHandler = React.useCallback((requiredIndex: number) => {
        setFieldValue('courseData', values.courseData.filter((_, index) => requiredIndex != index));
    }, [setFieldValue, values.courseData]);

    const items: AcadiaStepperItem[] = React.useMemo(() => {
        return [
            {
                title: 'Course Info',
                subTitle: '',
                component:
                    <form className='w-full h-[500px] sm:h-[600px] overflow-auto'>
                        <div className='w-full p-10 flex flex-col gap-4'>
                            <CommonInput
                                id='name'
                                value={values.name}
                                placeholder='Python Boot camp'
                                label='Course Name'
                                errors={errors.name}
                                type='text'
                                onChange={handleChange}
                                showError={touched.name}
                                required
                            />
                            <CommonTextArea
                                id='description'
                                value={values.description}
                                placeholder='Python Boot camp description'
                                label='Course description'
                                errors={errors.description}
                                onChange={handleChange}
                                showError={touched.description}
                                required
                            />
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <CommonInput
                                    id='price'
                                    value={values.price}
                                    placeholder='9'
                                    label='Course Price'
                                    errors={errors.price}
                                    type='number'
                                    onChange={handleChange}
                                    showError={touched.price}
                                    required
                                />
                                <CommonInput
                                    id='estimatedPrice'
                                    value={values.estimatedPrice ?? 0}
                                    placeholder='29'
                                    label='Estimated Course Price'
                                    errors={errors.estimatedPrice}
                                    type='number'
                                    onChange={handleChange}
                                    showError={touched.estimatedPrice}
                                    required
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <CommonInput
                                    id='tags'
                                    value={values.tags}
                                    placeholder='Python, Programming, Back-end'
                                    label='Tags'
                                    errors={errors.tags}
                                    type='text'
                                    onChange={handleChange}
                                    showError={touched.tags}
                                />
                                <CommonInput
                                    id='level'
                                    value={values.level}
                                    placeholder='Beginner, Intermediate or Advanced'
                                    label='Proficiency Level'
                                    errors={errors.level}
                                    type='text'
                                    onChange={handleChange}
                                    showError={touched.level}
                                    required
                                />
                            </div>
                            <CommonInput
                                id='demoUrl'
                                value={values.demoUrl}
                                placeholder='https://course-url.com'
                                label='Course Preview Url'
                                errors={errors.demoUrl}
                                type='text'
                                onChange={handleChange}
                                showError={touched.demoUrl}
                                required
                            />
                            <CommonFileInput
                                id='thumbnail'
                                label='Course Thumbnail'
                                setFieldValue={setFieldValue}
                                value={values.thumbnail}
                                showError={touched.thumbnail}
                                errors={errors.thumbnail}
                            />
                        </div>
                    </form>
            },
            {
                title: 'Course Options',
                subTitle: '',
                component:
                    <form className='w-full h-[500px] sm:h-[600px] overflow-auto' onSubmit={handleSubmit}>
                        <div className='w-full p-10 flex flex-col gap-4'>
                            <p>What are the benefits of this course?</p>
                            {values.benefits.map((benefit, index) => (
                                <div key={index} className='flex items-center justify-center gap-2'>
                                    <CommonInput
                                        id={`benefits[${index}].title`}
                                        value={benefit.title}
                                        placeholder='You will be able to program in Python professionally'
                                        type='text'
                                        onChange={handleChange}
                                    />
                                    <DeleteOutline onClick={() => removeBenefitHandler(index)} className='border border-1 rounded-md cursor-pointer' />
                                </div>
                            ))}
                            <button type="button" className='flex w-full self-start' onClick={addBenefitHandler}>
                                <AddCircleOutline />
                            </button>
                        </div>
                        <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500" />
                        <div className='w-full p-10 flex flex-col gap-4'>
                            <p>What are the prerequisites of this course?</p>
                            {values.prerequisites.map((prerequisite, index) => (
                                <div key={index} className='flex items-center justify-center gap-2'>
                                    <CommonInput
                                        id={`prerequisites[${index}].title`}
                                        value={prerequisite.title}
                                        placeholder='A Mac or PC computer with access to the internet'
                                        type='text'
                                        onChange={handleChange}
                                    />
                                    <DeleteOutline onClick={() => removePrerequisiteHandler(index)} className='border border-1 rounded-md cursor-pointer' />
                                </div>
                            ))}
                            <button type="button" className='flex w-full self-start' onClick={addPrerequisiteHandler}>
                                <AddCircleOutline />
                            </button>
                        </div>
                    </form>
            },
            {
                title: 'Course Content',
                subTitle: '',
                component:
                    <form className='w-full h-[500px] sm:h-[600px] overflow-auto'>
                        <div className='w-full p-10 flex flex-col gap-4'>
                            {values.courseData.map((courseContent, index) => (
                                <div key={index} className='flex flex-col gap-4 p-4 pb-5 border border-1 border-orange-500 rounded-lg bg-slate-100 dark:bg-slate-800 w-full'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-lg font-bold'>{courseContent.title}</p>
                                        <div className='flex items-center justify-center gap-1'>
                                            {index === visibleCourseSection
                                                ? <MdKeyboardArrowUp onClick={() => setVisibleCourseSection(-1)} size={30} className='cursor-pointer' />
                                                : <MdKeyboardArrowDown onClick={() => setVisibleCourseSection(index)} size={30} className='cursor-pointer' />}
                                            <DeleteOutline onClick={() => removeCourseVideoHandler(index)} className='border border-1 rounded-md cursor-pointer' />
                                        </div>
                                    </div>
                                    <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 -mx-4" />
                                    {index === visibleCourseSection && <>
                                        <CommonInput
                                            id={`courseData[${index}].title`}
                                            value={courseContent.title}
                                            label='Title'
                                            placeholder='Data Types'
                                            type='text'
                                            onChange={handleChange}
                                            required
                                        />
                                        <CommonTextArea
                                            id={`courseData[${index}].description`}
                                            value={courseContent.description}
                                            placeholder='Python has several built-in data types, including numeric types (int, float, complex), string (str), boolean (bool), and collection types (list, tuple, dict, set)'
                                            label='Video Description'
                                            onChange={handleChange}
                                            required
                                        />
                                        <CommonInput
                                            id={`courseData[${index}].videoUrl`}
                                            value={courseContent.videoUrl}
                                            label='Video URL'
                                            placeholder='https://www.youtube.com/watch?v'
                                            type='text'
                                            onChange={handleChange}
                                            required
                                        />
                                        <CommonInput
                                            id={`courseData[${index}].videoLength`}
                                            value={courseContent.videoLength}
                                            label='Video Length'
                                            placeholder='17'
                                            type='number'
                                            onChange={handleChange}
                                            required
                                        />
                                    </>}
                                </div>
                            ))}
                            <button type="button" className='flex w-full self-start' onClick={addCourseVideoHandler}>
                                <AddCircleOutline />
                            </button>
                            <button type="button" className='flex w-full self-start' onClick={onSubmitHandler}>
                                Submit
                            </button>
                        </div>
                    </form>
            }
        ]
    }, [addBenefitHandler, addCourseVideoHandler, addPrerequisiteHandler, errors.demoUrl, errors.description, errors.estimatedPrice, errors.level, errors.name, errors.price, errors.tags, errors.thumbnail, handleChange, handleSubmit, onSubmitHandler, removeBenefitHandler, removeCourseVideoHandler, removePrerequisiteHandler, setFieldValue, touched.demoUrl, touched.description, touched.estimatedPrice, touched.level, touched.name, touched.price, touched.tags, touched.thumbnail, values.benefits, values.courseData, values.demoUrl, values.description, values.estimatedPrice, values.level, values.name, values.prerequisites, values.price, values.tags, values.thumbnail, visibleCourseSection])

    return (
        <AcadiaStepper items={items} />
    )
}

export default CreateCourse;