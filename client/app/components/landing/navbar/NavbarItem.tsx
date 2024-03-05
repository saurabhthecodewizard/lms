import Link from 'next/link';
import React from 'react';

interface NavbarItemProps {
    title: string;
    link: string;
    activeLink: string;
    onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    const { title, link, activeLink, onChange } = props;
    return (
        <Link href={`${link}`}>
            <button onClick={onChange} value={link} className={`${activeLink === link ? 'text-orange-500 font-bold' : ''} `}>
                {title}
            </button>
        </Link>
    )
}

export default NavbarItem;