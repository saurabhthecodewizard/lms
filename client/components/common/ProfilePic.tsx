import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import { PiUserCircleLight } from 'react-icons/pi';

interface ProfilePicProps {
    name: string;
    email: string;
    url?: string;
    loading: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePic: React.FC<ProfilePicProps> = (props) => {
    const { name, email, url, loading = false, onChange } = props;
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='relative rounded-full bg-slate-50 dark:bg-slate-900 p-2'>
                {loading
                    ? <Skeleton variant='circular' height={150} width={150} />
                    : url
                        ? <Image alt={name} src={url} height={0} width={0} className='w-40 rounded-full' />
                        : <PiUserCircleLight size={150} />}
                {onChange &&
                    <>
                        <input
                            type='file'
                            id='avatar-profile'
                            className='hidden'
                            onChange={onChange}
                            accept='image/png, image/jpf, image/jpeg, image/webp'
                        />
                        <label htmlFor='avatar-profile'>
                            <div className='w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                                <AiOutlineCamera size={20} className='z-1' />
                            </div>
                        </label>
                    </>}
            </div>
            <h1 className='mt-3 text-3xl'>{name}</h1>
            <p className='font-extralight text-sm'>{email}</p>
        </div>
    )
}

export default ProfilePic;