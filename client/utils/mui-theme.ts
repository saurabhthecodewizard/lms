'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f97316',
            "50": '#fff7ed',
            "100": '#ffedd5',
            "200": '#fed7aa',
            "300": '#fdba74',
            "400": '#fb923c',
            "500": '#f97316',
            "600": '#ea580c',
            "700": '#c2410c',
            "800": '#9a3412',
            "900": '#7c2d12'
        },
        // ...(mode === 'light' ?
        // {
        //     background: {
        //         default: '#f8fafc',
        //         paper: '#f8fafc'
        //     },
        //     text: {
        //         primary: '#0f172a'
        //     }
        // }
        // :
        // {
        //     background: {
        //         default: '#18181b',
        //         paper: '#18181b'
        //     },
        //     text: {
        //         primary: '#f4f4f5'
        //     }
        // })
    }
});

export default theme;