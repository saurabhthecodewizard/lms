'use client';
import Image from 'next/image';
import React from 'react';
import AcadiaLogo from '../../common/AcadiaLogo';
import { navbarItems } from '@/lib/constants';
import NavbarItem from './NavbarItem';
import NavbarItemType from './types/navbarItem.interface';
import CommonButton from '../../common/CommonButton';
import { SlMenu } from 'react-icons/sl';
import { BiX } from 'react-icons/bi';
import ThemeSwitch from '@/app/utils/ThemeSwitch';

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = (props) => {
    const [active, setActive] = React.useState('home');
    const [toggle, setToggle] = React.useState<boolean>(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const onClickOutsideHandler = React.useCallback(
        (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setToggle(false);
            }
        },
        [menuRef]
    );

    const onClickToggleXHandler = React.useCallback(() => {
        setToggle(false);
    }, []);

    const onClickToggleMenuHandler = React.useCallback(() => {
        setToggle(true);
    }, []);

    React.useEffect(() => {
        document.addEventListener('mousedown', onClickOutsideHandler);
        return () => {
            document.removeEventListener('mousedown', onClickOutsideHandler);
        };
    }, [onClickOutsideHandler]);

    const onChangeItemHandler = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.value;
        setActive(value);
        setToggle(false);
    }, []);

    return (
        <>
            <nav className="flex items-center justify-between px-4 sm:px-16 md:px-28 py-4 bg-white border-white dark:bg-gray-900 dark:border-gray-900">
                <div className='basis-1/3 flex items-center justify-start'>
                    <AcadiaLogo />
                </div>
                <div className='hidden xl:flex items-center justify-center gap-10 basis-1/3'>
                    {
                        navbarItems.map((item) => (
                            <NavbarItem
                                key={item.link}
                                title={item.title}
                                link={item.link}
                                activeLink={active}
                                onChange={onChangeItemHandler}
                            />
                        ))
                    }
                </div>
                <div className='basis-1/3 flex items-center justify-end gap-4'>
                    <ThemeSwitch />
                    <CommonButton theme='outline'>
                        Login
                    </CommonButton>
                    {
                        toggle ?
                            <BiX onClick={onClickToggleXHandler} className='text-orange-500 text-2xl flex xl:hidden' /> :
                            <SlMenu onClick={onClickToggleMenuHandler} className='text-orange-500 text-2xl flex xl:hidden' />
                    }
                    <div
                        ref={menuRef}
                        className={`${toggle ? 'block z-50' : 'hidden'} xl:hidden fixed mt-16 sm:mt-20 py-4 rounded-2xl self-start right-2 sm:right-16 md:right-28 max-h-[32rem] w-28 border-gray-100 border-opacity-40 bg-opacity-90 bg-gray-100 shadow-lg shadow-black/[0.05] px-3 dark:bg-gray-900 dark:border-black/40 dark:bg-opacity-90`}
                    >
                        <ul className='flex flex-col items-center justify-center h-full gap-y-4 text-[1rem] font-medium bg-'>
                            {
                                navbarItems.map((item) => (
                                    <NavbarItem
                                        key={item.link}
                                        title={item.title}
                                        link={item.link}
                                        activeLink={active}
                                        onChange={onChangeItemHandler}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Navbar;