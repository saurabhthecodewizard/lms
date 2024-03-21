'use client'
import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AcadiaLogo from '../common/AcadiaLogo';
import { HiMenuAlt4 } from 'react-icons/hi';
import ThemeSwitch from '@/utils/ThemeSwitch';
import { useAppDispatch } from '@/redux/hooks';
import { toggleSidebar } from '@/redux/features/sidebar/sidebar.slice';
import { useRouter } from 'next/navigation';
import { FaCircleNotch } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useLazyLogoutQuery } from '@/redux/features/auth/authApi';
import { useLoadUserQuery } from '@/redux/features/apiSlice';
import { useLazyFetchAllUnreadNotificationsQuery } from '@/redux/features/notifications/notification.api';
import useNotify from '@/hooks/useNotify';
import NotificationItem from '../NotificationItem';
import { Badge } from '@mui/material';
import { IoNotifications } from 'react-icons/io5';
import useProfile from '@/hooks/useProfile';

const AcadiaAppBar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const [fetchNotifications, { data: notifications }] = useLazyFetchAllUnreadNotificationsQuery();
    const [logout, logoutResult] = useLazyLogoutQuery();
    const { refetch } = useLoadUserQuery();
    const dispatch = useAppDispatch();
    const { isAdmin } = useProfile();
    useNotify();

    const latestNotifications = React.useMemo(() => {
        if (!notifications) {
            return [];
        }
        return notifications.notifications;
    }, [notifications]);

    const openDrawer = React.useCallback(() => {
        dispatch(toggleSidebar(true));
    }, [dispatch]);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const onClickProfileHandler = React.useCallback((_event: React.MouseEvent<HTMLLIElement>) => {
        router.push('/profile');
    }, [router]);

    const onClickLogoutHandler = React.useCallback((_event: React.MouseEvent<HTMLLIElement>) => {
        logout();
    }, [logout]);

    React.useEffect(() => {
        if (logoutResult.isSuccess) {
            toast.success('Logged out Successfully');
            refetch()
        }
    }, [logoutResult.isSuccess, refetch, router]);

    React.useEffect(() => {
        if (isAdmin) {
            fetchNotifications();
        }
    }, [fetchNotifications, isAdmin])

    return (
        <Box>
            <div className='fixed flex items-center justify-between w-full bg-slate-50 border-white dark:bg-gray-900 dark:border-gray-900 px-4 py-2'>
                <div className='flex items-center justify-start'>
                    <HiMenuAlt4 onClick={openDrawer} className='w-10 h-10 p-2 mr-2 lg:hidden rounded-full border border-white dark:border-slate-950 cursor-pointer' />
                    <AcadiaLogo />
                </div>

                <div className='flex items-center justify-center'>
                    {isAdmin && <>
                        <IconButton
                            size="large"
                            aria-controls="menu-notification"
                            aria-haspopup="true"
                            onClick={handleNotificationMenu}
                            color="inherit"
                        >
                            <Badge color='primary' badgeContent={latestNotifications.length}>
                                <IoNotifications size={25} className='cursor-pointer' />
                            </Badge>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={notificationAnchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(notificationAnchorEl)}
                            onClose={handleNotificationClose}
                            MenuListProps={{
                                sx: {
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }
                            }}
                        >
                            <div className='bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-2 w-96'>
                                {latestNotifications.map((notification) => (
                                    <NotificationItem key={notification._id} {...notification} />
                                ))}
                            </div>
                        </Menu>
                    </>}

                    <ThemeSwitch />

                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                            sx: {
                                paddingTop: 0,
                                paddingBottom: 0
                            }
                        }}
                    >
                        <div className='bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-2 w-28'>
                            <MenuItem className='hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center gap-2' onClick={onClickProfileHandler}>
                                <p>Profile</p>
                            </MenuItem>
                            <MenuItem className='hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center gap-2' onClick={onClickLogoutHandler}>
                                <p>Logout</p>
                                {logoutResult.isLoading || logoutResult.isFetching && <FaCircleNotch className='h-5 w-5 animate-spin' />}
                            </MenuItem>
                        </div>
                    </Menu>
                </div>
            </div>
        </Box>
    );
}

export default AcadiaAppBar;