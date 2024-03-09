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

const AcadiaAppBar = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();

    const openDrawer = React.useCallback(() => {
        dispatch(toggleSidebar(true));
    }, [dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <div className='fixed flex items-center justify-between w-full bg-slate-50 border-white dark:bg-gray-900 dark:border-gray-900 px-4 py-2'>
                <div className='flex items-center justify-start'>
                    {/* <div className='lg:hidden rounded-full border border-white dark:border-slate-950 cursor-pointer'>
                        <HiMenuAlt4 className='w-10 h-10 p-2 lg:hidden rounded-full border border-white dark:border-slate-950 cursor-pointer' />
                    </div> */}
                    <HiMenuAlt4 onClick={openDrawer} className='w-10 h-10 p-2 mr-2 lg:hidden rounded-full border border-white dark:border-slate-950 cursor-pointer' />
                    <AcadiaLogo />
                </div>
                {auth && (
                    <div className='flex items-center justify-center'>
                        <ThemeSwitch />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </Box>
    );
}

export default AcadiaAppBar;