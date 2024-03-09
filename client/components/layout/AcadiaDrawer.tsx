'use client'
import { toggleSidebar } from '@/redux/features/sidebar/sidebar.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Drawer } from '@mui/material';
import React from 'react';

const AcadiaDrawer = () => {
    const { isOpen } = useAppSelector(state => state.sidebar);
    const dispatch = useAppDispatch();

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
                    <header className="p-4 font-bold text-lg">Header</header>
                    <NavItem />
                    <NavItem />
                    <NavItem />
                </div>
            </Drawer>



            <div className="w-80 hidden lg:flex lg:flex-col bg-slate-50 dark:bg-slate-900 h-full">
                <header className="p-8 font-bold text-lg">Header</header>
                <NavItem />
                <NavItem />
                <NavItem />
            </div>
        </>
    );
};

const NavItem = () => {
    return (
        <div className='flex items-center justify-between'>
            <a
                href="#"
                className="py-2 pl-4 hover:bg-slate-200 dark:hover:bg-slate-800 w-full"
            >
                Item
            </a>
            <div className='border-2 border-orange-500 h-full' />
        </div>
    );
};

export default AcadiaDrawer;