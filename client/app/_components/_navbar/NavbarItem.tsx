import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavbarItemProps {
    title: string;
    link: string;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    const { title, link } = props;
    const pathname = usePathname();
    const router = useRouter();

    const isActive = React.useMemo(() => {
        if (title === 'Home') {
            return pathname === '/';
        }
        return link !== '/' && pathname.includes(link);
    }, [link, pathname, title]);

    const onClickHandler = React.useCallback(() => {
        router.push(link);
    }, [link, router]);

    return (
        <button onClick={onClickHandler} className={`${isActive ? 'text-orange-500 font-bold' : ''} `}>
            {title}
        </button>
    )
}

export default NavbarItem;