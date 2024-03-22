'use client'
import { useLoadUserQuery } from '@/redux/features/apiSlice';
import { toggleSidebar } from '@/redux/features/sidebar/sidebar.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Divider, Drawer } from '@mui/material';
import React from 'react';
import ProfilePic from '../common/ProfilePic';
import AcadiaLogo from '../common/AcadiaLogo';
import { usePathname, useRouter } from 'next/navigation';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { IconType } from 'react-icons';
import { RxDashboard } from 'react-icons/rx';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineAnalytics } from 'react-icons/md';
import { SiSololearn } from 'react-icons/si';
import { GoLog } from 'react-icons/go';
import useProfile from '@/hooks/useProfile';

interface DrawerItemProps {
    icon: IconType;
    label: string;
    href: string;
    onClick?: () => void;
}

const AcadiaDrawer = () => {
    const { isOpen } = useAppSelector(state => state.sidebar);
    const { isLoading, data } = useLoadUserQuery();
    const { isAdmin } = useProfile();
    const dispatch = useAppDispatch();

    const drawerItems = React.useMemo((): DrawerItemProps[] => {
        const items = [
            {
                label: 'Profile',
                href: '/profile',
                icon: IoPersonCircleOutline
            },
            {
                label: 'Dashboard',
                href: '/dashboard',
                icon: RxDashboard
            }
        ];

        if (isAdmin) {
            return [
                ...items,
                {
                    label: 'Logs',
                    href: '/admin/logs',
                    icon: MdOutlineAnalytics
                },
                {
                    label: 'Courses',
                    href: '/admin/courses',
                    icon: SiSololearn
                },
                {
                    label: 'Users',
                    href: '/admin/users',
                    icon: FaUsers
                },
                {
                    label: 'Invoices',
                    href: '/admin/orders',
                    icon: GoLog
                }
            ];
        }

        return items;
    }, [isAdmin])

    const closeDrawer = React.useCallback(() => {
        dispatch(toggleSidebar(false));
    }, [dispatch]);

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={closeDrawer}
                className='lg:hidden bg-slate-50 dark:bg-slate-900'
            >
                <div className="w-60 flex flex-col bg-slate-50 dark:bg-slate-900 h-full">
                    <div className='self-center pt-3 flex flex-col'>
                        <div className='self-start'>
                            <AcadiaLogo />
                        </div>
                        <Divider />
                        <div className='self-center py-8 flex flex-col items-center justify-start text-slate-900 dark:text-slate-100'>
                            <ProfilePic
                                loading={isLoading}
                                name={data?.user.firstName + `${!!data?.user.lastName ? ' ' + data.user.lastName : ''}`}
                                email={data?.user.email ?? ''}
                                url={data?.user.avatar?.url}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        {drawerItems.map((item) =>
                            <DrawerItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                onClick={closeDrawer}
                            />)}
                    </div>
                </div>
            </Drawer>

            <div className="w-80 hidden lg:flex lg:flex-col justify-start bg-slate-50 dark:bg-slate-900 h-full">
                <div className='self-center py-10 flex flex-col items-center justify-start'>
                    <ProfilePic
                        loading={isLoading}
                        name={data?.user.firstName + `${!!data?.user.lastName ? ' ' + data.user.lastName : ''}`}
                        email={data?.user.email ?? ''}
                        url={data?.user.avatar?.url}
                    />
                </div>
                <div className='flex flex-col pl-4'>
                    {drawerItems.map((item) =>
                        <DrawerItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                        />)}
                </div>
            </div>
        </>
    );
};

const DrawerItem: React.FC<DrawerItemProps> = (props) => {
    const { label, href, icon: Icon, onClick } = props;
    const pathname = usePathname();
    const router = useRouter();

    const onClickHandler = React.useCallback(() => {
        if (onClick) {
            onClick();
        }
        router.push(href);
    }, [href, onClick, router]);

    const isActive = React.useMemo(() => {
        return pathname.includes(href);
    }, [href, pathname]);

    React.useEffect(() => {
        if (pathname === '/admin') {
            router.push('/admin/logs')
        }
    }, [pathname, router]);

    return (
        <button
            onClick={onClickHandler}
            className={`flex items-center gap-4 h-14 pl-4 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg cursor-pointer ${isActive ? 'font-bold bg-slate-200 dark:bg-slate-800 text-orange-500' : 'text-slate-900 dark:text-slate-100'}`}>
            <Icon size={30} className='items-start' />
            <div className="flex w-full">
                {label}
            </div>
            {isActive && <div className='border-2 border-orange-500 h-full rounded-full' />}
        </button>
    );
};

export default AcadiaDrawer;