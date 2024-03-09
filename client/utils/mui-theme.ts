'use client';
import { Roboto } from 'next/font/google';
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
        }
    }
});

export default theme;