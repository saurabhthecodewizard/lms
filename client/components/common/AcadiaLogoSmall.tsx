import { logoSmallDark, logoSmallLight } from '@/lib/assets';
import Image from 'next/image';
import React from 'react'

interface AcadiaLogoSmallProps {
    containerClassName?: string;
    className?: string;
}

const AcadiaLogoSmall: React.FC<AcadiaLogoSmallProps> = (props) => {
    const { containerClassName, className } = props;
    return (
        <>
            <div className={`hidden dark:flex ${containerClassName}`}>
                <Image priority src={logoSmallDark} alt='ACADIA' width={0} height={0} className={`py-2 w-12 ${className}`} />
            </div>
            <div className={`flex dark:hidden ${containerClassName}`}>
                <Image priority src={logoSmallLight} alt='ACADIA' width={0} height={0} className={`py-2 w-12 ${className}`} />
            </div>
        </>
    )
}

export default AcadiaLogoSmall;