import { logo } from '@/lib/assets';
import Image from 'next/image';
import React from 'react';

const AcadiaLogo = () => {
    return (
        <Image src={logo} alt='ACADIA' width={200} height={200} className='py-2' />
    )
}

export default AcadiaLogo;