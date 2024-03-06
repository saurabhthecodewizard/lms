'use client'
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

interface StoreProviderProps {
    children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
    return <Provider store={store}>{children}</Provider>
};