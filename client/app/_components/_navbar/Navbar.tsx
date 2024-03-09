'use client';
import React from 'react';
import AcadiaLogo from '../../../components/common/AcadiaLogo';
import { navbarItems } from '@/lib/constants';
import NavbarItem from './NavbarItem';
import CommonButton from '../../../components/common/CommonButton';
import { SlMenu } from 'react-icons/sl';
import { BiX } from 'react-icons/bi';
import ThemeSwitch from '@/utils/ThemeSwitch';
import { SxProps, Theme } from '@mui/material';
import CurrentForm from '../_auth/enums/currentForm.enum';
import FormModal from '../_auth/FormModal';
import SignIn from '../_auth/SignIn';
import SignUp from '../_auth/SignUp';
import Verification from '../_auth/Verification';

const style: SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = (_props) => {
    const [active, setActive] = React.useState('home');
    const [toggle, setToggle] = React.useState<boolean>(false);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [currentForm, setCurrentForm] = React.useState<CurrentForm>(CurrentForm.NONE);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const onChangeFormHandler = React.useCallback((selected: CurrentForm) => {
        setCurrentForm(selected);
    }, [])

    const onModalCloseHandler = React.useCallback(() => setModalOpen(false), []);

    const onModalOpenHandler = React.useCallback(() => {
        setModalOpen(true);
        onChangeFormHandler(CurrentForm.SIGN_IN);
    }, [onChangeFormHandler]);

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
            <nav className="flex items-center justify-between px-4 sm:px-20 md:px-28 lg:px-40 xl:px-60 py-1 bg-slate-50 border-white dark:bg-gray-900 dark:border-gray-900">
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
                    <CommonButton onClick={onModalOpenHandler} theme='outline'>
                        Sign In
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
                    {
                        modalOpen && (currentForm === CurrentForm.SIGN_IN
                            ? <FormModal
                                component={SignIn}
                                modalOpen={modalOpen}
                                onModalClose={onModalCloseHandler}
                                onChangeForm={onChangeFormHandler}
                            />
                            : currentForm === CurrentForm.SIGN_UP
                                ? <FormModal
                                    component={SignUp}
                                    modalOpen={modalOpen}
                                    onModalClose={onModalCloseHandler}
                                    onChangeForm={onChangeFormHandler}
                                />
                                : currentForm === CurrentForm.VERIFICATION
                                    ? <FormModal
                                        component={Verification}
                                        modalOpen={modalOpen}
                                        onModalClose={onModalCloseHandler}
                                        onChangeForm={onChangeFormHandler}
                                    />
                                    : null)
                    }
                </div>
            </nav>
        </>
    )
};

export default Navbar;