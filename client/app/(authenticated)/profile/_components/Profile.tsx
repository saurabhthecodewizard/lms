'use client'
import React from 'react';
import { useChangePasswordMutation, useUpdateAvatarMutation, useUpdateProfileMutation } from '@/redux/features/profile/profile.api';
import { useLoadUserQuery } from '@/redux/features/apiSlice';
import UserProfile from '@/redux/interfaces/userProfile.interface';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import UpdateProfile from '@/redux/interfaces/updateProfile.interface';
import { useFormik } from 'formik';
import GenericTab, { TabProps } from '@/components/common/GenericTab';
import CommonInput from '@/components/common/CommonInput';
import CommonButton from '@/components/common/CommonButton';
import CommonPasswordInput from '@/components/common/CommonPasswordInput';
import useStringState from '@/hooks/useStringState';
import ProfilePic from '@/components/common/ProfilePic';
import { CircularProgress } from '@mui/material';

const initialState: UserProfile = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'user'
}

const schema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string()
})

const Profile = () => {
    const { isLoading, isSuccess, data, refetch } = useLoadUserQuery();
    const [updateProfile, updateProfileResult] = useUpdateProfileMutation();
    const [updateAvatar, updateAvatarResult] = useUpdateAvatarMutation();
    const [changePassword, changePasswordResult] = useChangePasswordMutation();
    const { value: oldPassword, onValueChange: onChangeOldPassword } = useStringState('');
    const { value: newPassword, onValueChange: onChangeNewPassword } = useStringState('');
    const { value: confirmPassword, onValueChange: onChangeConfirmPassword } = useStringState('');
    const [user, setUser] = React.useState<UserProfile>(initialState);
    const { touched, errors, values, handleChange, handleSubmit } = useFormik<UpdateProfile>({
        initialValues: user,
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: async (profile) => {
            await updateProfile(profile);
            refetch();
        }
    });

    const onSubmitPasswordHandler = React.useCallback(() => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are mandatory!')
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        changePassword({ oldPassword, newPassword });
    }, [changePassword, confirmPassword, newPassword, oldPassword]);

    const tabItems: TabProps[] = React.useMemo(() => [
        {
            label: 'General',
            node: <div className='flex flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-900 w-80 sm:96 md:w-[500px] lg:w-[600px] xl:w-[700px] h-96 rounded-xl px-10 py-5'>

                <CommonInput
                    id='firstName'
                    value={values.firstName}
                    placeholder='First Name'
                    label='First Name'
                    errors={errors.firstName}
                    type='text'
                    onChange={handleChange}
                    showError={touched.firstName}
                    required
                />

                <CommonInput
                    id='lastName'
                    value={values.lastName || ''}
                    placeholder='Last Name'
                    label='Last Name'
                    errors={errors.lastName}
                    type='text'
                    onChange={handleChange}
                    showError={touched.lastName}
                    required
                />

                <CommonInput
                    id='email'
                    value={user.email}
                    placeholder='mail@mail.com'
                    label='Email'
                    type='email'
                    disabled
                />

                <CommonButton theme='solid' onClick={handleSubmit} className='self-start px-8'>
                    Save
                </CommonButton>
            </div>
        },
        {
            label: 'Info',
            node: <div className='flex flex-col items-center justify-start gap-6 bg-slate-50 dark:bg-slate-900 w-80 sm:96 md:w-[500px] lg:w-[600px] xl:w-[700px] h-96 rounded-xl px-10 py-5'>
                <CommonInput
                    id='courses'
                    value={user.courses?.length ?? 0}
                    placeholder='0'
                    label='No. of Enrolled Courses'
                    type='number'
                    disabled
                />
            </div>
        },
        {
            label: 'Password',
            node: <div className='flex flex-col items-center justify-start gap-6 bg-slate-50 dark:bg-slate-900 w-80 sm:96 md:w-[500px] lg:w-[600px] xl:w-[700px] h-96 rounded-xl px-10 py-5'>
                <CommonPasswordInput
                    value={oldPassword}
                    label='Old Password'
                    onChange={onChangeOldPassword}
                    errors=''
                />

                <CommonPasswordInput
                    value={newPassword}
                    label='New Password'
                    onChange={onChangeNewPassword}
                    errors=''
                />

                <CommonPasswordInput
                    value={confirmPassword}
                    label='Confirm Password'
                    onChange={onChangeConfirmPassword}
                    errors=''
                />

                <CommonButton theme='solid' onClick={onSubmitPasswordHandler} className='self-start px-8'>
                    Save Password
                </CommonButton>
            </div>
        }
    ],
        [
            confirmPassword,
            errors.firstName,
            errors.lastName,
            handleChange,
            handleSubmit,
            newPassword,
            oldPassword,
            onChangeConfirmPassword,
            onChangeNewPassword,
            onChangeOldPassword,
            onSubmitPasswordHandler,
            touched.firstName,
            touched.lastName,
            user.courses?.length,
            user.email,
            values.firstName,
            values.lastName
        ]
    );

    const onImageChange = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            toast.error('Something went wrong!')
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = async () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result as string;
                await updateAvatar(avatar);
                refetch();
            }
        }
        fileReader.readAsDataURL(event.target.files[0])
    }, [refetch, updateAvatar])

    React.useEffect(() => {
        if (!isLoading && isSuccess && data) {
            setUser(data.user);
        }
    }, [data, isLoading, isSuccess]);

    React.useEffect(() => {
        if (updateProfileResult.isSuccess) {
            toast.success("Profile updated successfully")
        }
        if (updateProfileResult.isError) {
            toast.error("Profile could not be updated")
        }
    }, [updateProfileResult.isError, updateProfileResult.isSuccess]);

    React.useEffect(() => {
        if (updateAvatarResult.isSuccess) {
            toast.success("Profile picture updated successfully")
        }
        if (updateAvatarResult.isError) {
            let message;
            if ('data' in updateAvatarResult.error) {
                message = (updateAvatarResult.error.data as any).message;
            }
            toast.error(message ?? "Profile picture could not be updated")
        }
    }, [updateAvatarResult.data, updateAvatarResult.error, updateAvatarResult.isError, updateAvatarResult.isSuccess]);

    React.useEffect(() => {
        if (changePasswordResult.isSuccess) {
            toast.success("Password updated successfully")
        }
        if (changePasswordResult.isError) {
            let message;
            if ('data' in changePasswordResult.error) {
                message = (changePasswordResult.error.data as any).message;
            }
            toast.error(message ?? "Password could not be updated")
        }
    }, [changePasswordResult.data, changePasswordResult.error, changePasswordResult.isError, changePasswordResult.isSuccess]);

    return (
        isLoading
            ? <div className="flex w-full items-center justify-center">
                <CircularProgress />
            </div>
            : <div className='flex flex-col items-center justify-center'>
                <ProfilePic
                    loading={isLoading || changePasswordResult.isLoading}
                    name={data?.user.firstName + `${!!data?.user.lastName ? ' ' + data.user.lastName : ''}`}
                    email={data?.user.email ?? ''}
                    url={data?.user.avatar?.url}
                    onChange={onImageChange}
                />
                <div className='flex items-center justify-center'>
                    <GenericTab items={tabItems} />
                </div>
            </div>
    )
}

export default Profile;