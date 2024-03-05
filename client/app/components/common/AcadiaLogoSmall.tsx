import { logoSmall } from '@/lib/assets';
import Image from 'next/image';
import React from 'react';

const AcadiaLogoSmall = () => {
    return (
        <Image src={logoSmall} alt='ACADIA' width={100} height={100} className='py-2' />
    )
}

export default AcadiaLogoSmall;