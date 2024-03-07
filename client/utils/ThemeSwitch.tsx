'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const onChangeThemeHandler = React.useCallback(() => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [setTheme, theme])

    return (
        <div className='flex items-center justify-center cursor-pointer'>
            {
                theme === 'light'
                    ? <BiMoon
                        className=''
                        fill='black'
                        size={25}
                        onClick={onChangeThemeHandler}
                    />
                    : <BiSun
                        size={25}
                        className=''
                        onClick={onChangeThemeHandler}
                    />
            }
        </div>
    )
}

export default ThemeSwitch;