import { logo } from '@/lib/assets';
import Image from 'next/image';
import React from 'react';

const AcadiaLogo = () => {
    return (
        <Image priority src={logo} alt='ACADIA' width={0} height={0} className='py-2 w-48' />
    )
}

export default AcadiaLogo;