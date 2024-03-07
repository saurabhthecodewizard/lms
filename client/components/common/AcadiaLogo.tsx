import { logo } from '@/lib/assets';
import Image from 'next/image';
import React from 'react';
import AcadiaLogoSmall from './AcadiaLogoSmall';

const AcadiaLogo = () => {
    return (
        <>
            <AcadiaLogoSmall />
            <Image src={logo} alt='ACADIA' width={0} height={0} className='ml-1 py-2 w-20' />
        </>
    )
}

export default AcadiaLogo;